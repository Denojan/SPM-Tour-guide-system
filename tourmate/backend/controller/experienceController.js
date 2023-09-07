const Experience =  require('../models/ExperienceModel');
const asyncHandler = require('express-async-handler');

const addExperience = asyncHandler(async (req, res) => {
console.log(req.body);
 try {
    const { topic, userName, location, image, description ,ratings,reviews} = req.body;
    const experience = new Experience({
      topic,
      userName,
      location,
      image,
      description,
      ratings,
      reviews
    });
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});




//read all experiences
const readExperience = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


//get one experiences
const getOneExperience = async (req, res) => {
  const { id } = req.params;

  let experience = null;

  try {
    experience = await Experience.findOne({ _id: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  // check if experience exists
  if (!experience) {
    return res.status(404).json({
      error: "experience not found",
    });
  }
  res.status(200).json({ experience });
};


// Update an experience
const updateExperience = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { topic, userName, location, image, description } = req.body;

  try {
    // Check if the experience exists
    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Update the experience fields
    experience.topic = topic;
    experience.userName = userName;
    experience.location = location;
    experience.image = image;
    experience.description = description;

    // Save the updated experience
    await experience.save();

    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


//delete
const deleteExperience = asyncHandler(async (req, res) => {
  const id = req.params.id; 
  const experience = await Experience.findByIdAndDelete(id);
  console.log(experience);

  if (experience) {
    res.status(200).json(experience);
  } else {
    res.status(404).json({ message: "Experience not found" });
  }
});



/*// search experience by location
const searchExperienceByLocation = asyncHandler(async (req, res) => {
  const location = req.params.location;

  const experience = await Experience.findOne({ location: location });

  if (experience) {
    res.status(200).json(experience);
  } else {
    res.status(404).json({ message: "Experience not found" });
  }
});



const addRating = async (req, res) => {
  try {
    const { experienceId, rating } = req.body;
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    experience.ratings.push(rating);
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const addReview = async (req, res) => {
  try {
    const { experienceId, review } = req.body;
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    experience.reviews.push(review);
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

/*exports.addComment = async (req, res) => {
  try {
    const { experienceId, userName, comment } = req.body;
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    experience.comments.push({ userName, comment });
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};*/



module.exports = {
   
    addExperience,
    readExperience,
    updateExperience,
    deleteExperience,
    getOneExperience
  
  };