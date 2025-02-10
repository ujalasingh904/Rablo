import Loan from "../models/loanModel.js";

export const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find();
        res.status(200).json(loans);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLoan = async (req, res) => {
    const loan = req.body;
    try {
        const newLoan = new Loan(loan);
        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateLoan = async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(400).json({ message: "Error updating loan", error: error.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.status(200).json({ message: "Loan deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting loan", error: error.message });
    }
}
