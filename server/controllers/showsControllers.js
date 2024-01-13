
const asyncHandler = require("express-async-handler");
const Shows = require("../module/Shows");

//Admin can create new show
//Create

const createShow = asyncHandler(async(req, res)=> {
    const {dateforshow, batch, movie, price} = req.body;
    if(!dateforshow || !batch || !movie ){
        console.log("all field require");
        return res.status(400).json({message: "All Field are require"});
    }
    const duplicate = await Shows.findOne({dateforshow, batch})
    if(duplicate){
        console.log("duplicate");
        return res.status(400).json({message: "same day same batch Exist"})
    }
    const newShow = await Shows.create({dateforshow, batch, movie, price});
    if(!newShow){
        console.log("some thing goes wrong");
        return res.status(400).json({message: "Something gone Wrong"})
    }
    console.log("Success");
    res.status(200).json({message: "Show created Successfully", newShow})
})

//Admin can update Existing show
//Update

const UpdateShow = asyncHandler(async (req, res) => {
    const {dateforshow, batch, movie, price} = req.body;
    const { id } = req.params;

    if(!dateforshow && !batch && !movie && !price){
        return res.status(400).json({message: "Please Update any of the show field"})
    }

    let show = await Shows.findById(id);

    if(!show){
        return res.status(400).json({message: "id is Invalid"});
    }

    show.dateforshow = dateforshow || show.dateforshow;
    show.batch = batch || show.batch;
    show.movie = movie || show.movie;
    show.price = price || show.price;

    await show.save()

    res.status(200).json({message: "Show Updated Successfully", show});

})


// deactive Shows
// Delete Shows

const deactiveShows = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let shows = await Shows.findByIdAndUpdate(id);

    if(!shows){
        return res.status(400).json({message: "shows Id does not Exist"});
    }

    shows.active = false;

    await shows.save()

    res.status(200).json({message: "Show deacrivate Successfully", shows})

})

// Select Single show
// Read

const selectSingleShow = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const shows = await Shows.findById(id);

    if(!shows){
        return res.status(400).json({message: "shows Id does not Exist"});
    }

    res.status(200).json({shows})
})

const deactivesingleShows = async (id) => {
    let singleshow = await Shows.findById(id)

    singleshow.active = false

    await singleshow.save()

}

// Only By Admin get all show
// read
const selectallshow = asyncHandler(async (req, res) => {
    let time = {
        1: 5,
        2: 9,
        3: 15,
        4: 19
    }
    const shows = await Shows.find({active: true})
    let filtershows = []
    shows.map(object => {
        const date = new Date();
        const showDate = new Date(object.dateforshow)
        showDate.setHours(time[object.batch], 0, 0)
        if(showDate.getFullYear() >= date.getFullYear() && showDate.getMonth() >= date.getMonth() && showDate.getDate() >= date.getDate()){
            if (showDate.getDate() == date.getDate() && showDate.getHours()  > date.getHours()) {
                filtershows.push(object);
                return true
            }else if( showDate.getDate() == date.getDate()){
                deactivesingleShows(object._id);
                return true
            }
            filtershows.push(object);
            return true
        }else{
            console.log("going in to deactivate");
            deactivesingleShows(object._id);
        }
    })

    res.json(filtershows);
})


module.exports = { createShow, UpdateShow, deactiveShows, selectSingleShow, selectallshow }

