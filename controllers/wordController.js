const word = require("../models/wordModel");

exports.getAllWords = async (req, res) => {
  try {
    const allWords = await word.find();

    res.status(200).json({
      status: "success",

      results: allWords.length,
      data: {
        words: allWords,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createWord = async (req, res) => {
  try {
    const newWord = await word.create({
      word: req.body.word,
    });

    res.status(201).json({
      status: "success",
      data: {
        word: newWord,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent , blank and duplicates not allowed",
      details: err,
    });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const word = await word.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        word,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    await word.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      word: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
