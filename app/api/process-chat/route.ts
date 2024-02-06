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

            TASKS:
            
            List tasks that someone says needs to be done or says they will do. For each pending task, find the following details:
            
            1. Summary of the task that needs to be done.
            2. When it is due. Use the “YYYY MM DD hh:mm” format. If no date is discernible, set this to “”.
            3. Who is assigned the task. If no one has said they will do a task, then set this to “”.
            
            NEXT MEETING:
            
            1. Title of the next meeting: Set this to a less-than-10-word summary of the agenda for the next meeting.
            2. Date of the next meeting. Use the “YYYY MM DD hh:mm” format. If no date is decided for the next meeting, denote this as “”. Use the date of the chat transcript to base the date of the next meeting on.
            3. Duration of the next meeting in minutes. If no duration is discussed, assume 15 minutes.
            4. Location of the next meeting. If no location has been decided, then return an empty string.
            5. Attendees of the next meeting. Assume it is all the participants of the meeting unless someone does not want to attend or is asked not to attend.
            
            QUESTIONS:

            1. If there are details missing, generate a question for each missing detail. Direct the question to the person who is most likely to know the answer. If no one is likely to know the answer, then direct the question to the group.

            Output the above details in the following JSON format. DO NOT INCLUDE ANY COMMENTS:
            
            {
                “chat participants”: string [],
                "tasks": [ 	
                    {
                        "task": string,
                        "date": string,
                        "assignee": string
                    } 
                ]
                "next meeting": {
                    “title”: string,
                    "date": string,
                    "duration": number,
                    "location": string,
                    "attendees": string []
                },
                "questions": [
                    {
                        "question": string,
                        "asked to": string
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