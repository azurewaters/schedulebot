import OpenAI from "openai";

export async function POST(req:Request) {
    console.log('Came to process-chat')

    // Get the chat transcript from the request body
    let result: string = ''
    
    //  Now, process the text using an LLM
    const chatTranscript:string = await req.text() || ''
    if (chatTranscript.length > 0) {
        console.log('Chat transcript:', chatTranscript)
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: 
            `The Chat Transcript below took place on 28 January 2024 at 12:30 PM. Extract the following details from it:

            Next meeting:
            
            1. Title of the next meeting: Set this to a less-than-10-word summary of the agenda for the next meeting.
            2. When the participants intend to meet next, if at all. Calculate the date using the date of the chat transcript for reference. Format the resulting date as “YYYY MM DD hh:mm”. If no date is decided for the next meeting, set it to “”.
            3. Duration of the next meeting in minutes. If no duration is discussed, set it to 30 minutes.
            4. Location of the next meeting. If no location has been decided, then return an empty string.
            5. Attendees of the next meeting. Assume it is all the participants of the meeting unless someone does not want to attend or is asked not to attend.
            
            Tasks:
            
            List tasks that someone says needs to be done or says they will do. For each pending task, find the following details:
            
            1. Summary of the task that needs to be done.
            2. When it is due. Use the “YYYY MM DD hh:mm” format. Calculate the date using the date of the chat transcript for reference. Format the resulting date as “YYYY MM DD hh:mm”. If no date is decided for the next meeting, set it to “”.
            3. Who is assigned the task. If no one has said they will do a task, then set this to “”.
            
            Output the above details in as short a response as possible, using the following JSON format:
            
            {
                “chat participants”: string [],
                "next meeting": {
                    “title”: string,
                    "date": string,
                    "duration": number,
                    "location": string,
                    "attendees": string []
                },
                "tasks": [ 	
                    {
                        "task": string,
                        "date": string,
                        "assignee": string
                    } 
                ]
            }
            __________________
                
            CHAT TRANSCRIPT:
            ${ chatTranscript }
            `}],
            model: 'gpt-3.5-turbo'
        })

        console.log('Completion', completion.choices[0].message.content)

        //  Now, return the result
        result = completion.choices[0].message.content || ''
    }

    //  Return the result
    return new Response(result)
}