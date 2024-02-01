import { Drink } from '@/app/types/Drinks'

//  Code to handle the GET request for the drinks API
export async function GET(req: Request) {
    //  Fetch the list of coffee drinks from sampleapis.com
    //  Dis
    const response = await fetch('https://api.sampleapis.com/coffee/hot')   //  The data that is returned is an array of objects that have a title and description amongst other things.
    const json = await response.json()

    //  Loop through the array and extract the title and description and return them as an array of Drink objects
    const drinks: Drink[] = json.map((d: any) => {
        return {
            id: json.indexOf(d) + 1,
            title: d.title,
            description: d.description
        }
    })

    //  Return a Response containing the array of drinks
    return new Response(JSON.stringify(drinks), {
        headers: {
            'content-type': 'application/json'
        }
    })   
}