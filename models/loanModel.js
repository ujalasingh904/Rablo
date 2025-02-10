import mongoose from "mongoose"

const loanSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        loanDate: { type: Date, default: Date.now },
        dueDate: { type: Date, required: true },
        returnDate: { type: Date },
        status: { type: String, enum: ["active", "returned", "overdue"], default: "active" },
    },
    { timestamps: true },
)

export default mongoose.model("Loan", loanSchema)

