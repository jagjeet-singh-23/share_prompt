import { ConnectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET 
export const GET = async (req, { params }) => {
    try {
        await ConnectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response('Prompt not found', { status: 404 })
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Unable to fetch Prompts', { status: 500 })
    }
}
// UPDATE
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await ConnectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response("Prompt does not exist!", { status: 404 })
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Error Updating the prompt", { status: 500 })
    }
}

// DELETE
export const DELETE = async (req, { params }) => {
    try {
        await ConnectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Successfully deleted the prompt", { status: 200 })
    } catch (error) {
        return new Response("Error deleting the prompt", { status: 500 })
    }
}