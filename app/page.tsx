'use client'

import { useState } from "react";

//  A page that contains a textarea and a button that sends the transcript to the 'api/process-chat' endpoint for processing.
//  The response from the endpoint is JSON. This will be displayed in a div below the textarea.
export default function Chat() {
    let [transcript, setTranscript] = useState("");
    let [chatDetails, setChatDetails] = useState({});
    let [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        //  Set is loading to true
        setIsLoading(true);

        //  Make a request to the server
        let response:Response = await fetch("/api/process-chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ transcript })
        })

        if (response.ok) {
            console.log("Got the response", response);
            let json = await response.json()
            if (typeof json === "object") {
                setChatDetails(json);
            } else {
                console.error("Expected a JSON object, but got", json);
            }
        } else {
            console.error("Failed to get the response", response);
        }

        //  Set is loading to false
        setIsLoading(false);
    }

    return (
        <div className="flex-1 grid grid-cols-3 gap-4">
            
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-lg">Chat transcript</h1>
                <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} className="flex-1 textarea textarea-bordered" placeholder="Use ChatGPT to generate a chat transcript and paste it here for processing." />
                <button disabled={transcript == '' || isLoading} className="btn btn-primary" onClick={handleClick}>Process it</button>
            </div>

            
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-lg">Continuing chat</h1>
                <div className="border border-1 border-gray-400 flex-1 rounded-lg">{" "}</div>
                <div className="flex gap-2">
                    <input type="text" className="flex-1 input input-bordered" placeholder="Type your message here" />
                    <button className="btn btn-primary">Send</button>
                </div>
            </div>
    
            <div className="flex flex-col gap-2">
                {/* Display the response from the server here  */}
                <h1 className="font-bold text-lg">Extracted Data</h1>
                { isLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : (
                    <textarea 
                        value={JSON.stringify(chatDetails, null, 2)} 
                        className="flex-1 textarea textarea-bordered"
                        readOnly />
                )}
            </div>
        </div>
    )
}
