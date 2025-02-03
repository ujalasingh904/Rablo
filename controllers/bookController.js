import Book from "../models/bookModel.js"

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) return res.status(404).json({ message: "No books found" })
        res.status(200).json(books);
    } catch (error) {
        console.log("Error in getAllBooks", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" })
        res.status(200).json(book);
    } catch (error) {
        console.log("Error in getBookById", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const addBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedDate, genre, coverImage } = req.body;


        if (!title || !author || !isbn) {
            return res.status(400).json({ message: "Title, Author, and ISBN are required." });
        }


        const book = new Book({ title, author, isbn, publishedDate, genre, coverImage });

        await book.save();
        return res.status(201).json(book);
    } catch (error) {
        console.log("Error in addBook", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    try {

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        console.log("Error in updateBook", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.log("Error in deleteBook", error.message)
        res.status(500).json({ message: error.message })
    }
}

export const uploadCoverImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const book = await Book.findByIdAndUpdate(req.params.id, { coverImage: req.file.path }, { new: true })

        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }

        res.status(200).json({ message: "Cover image uploaded successfully", book })
    } catch (error) {
        res.status(500).json({ message: "Error uploading cover image", error: error.message })
    }
}