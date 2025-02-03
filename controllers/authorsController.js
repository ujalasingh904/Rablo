import Author from '../models/authorModel.js'

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        if (!authors) {
            return res.status(404).json({ message: "No authors found" })
        }
        res.status(200).json(authors)
    } catch (error) {
        console.log("Error in getAuthors", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "No author found" })
        }
        res.status(200).json(author);
    } catch (error) {
        console.log("Error in getAuthors by id", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const createAuthor = async (req, res) => {
    try {
        const { name, birthDate, nationality, biography } = req.body;
        if (!name) return res.status(404).json({ message: "Name is required" })

        const newAuthor = new Author({ name, birthDate, nationality, biography })
        await newAuthor.save();
        res.status(201).json(newAuthor)
    } catch (error) {
        console.log("Error in createAuthor", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const updateAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: "No author found" })
        }

        const updatedAuthor = await Author.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedAuthor)
    } catch (error) {
        console.log("Error in updateAuthor", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: "No author found" })
        }

        await Author.findByIdAndDelete(id);
        res.status(200).json({ message: "Author deleted successfully" })
    } catch (error) {
        console.log("Error in updateAuthor", error.message)
        res.status(500).json({ message: error.message })
    }
}