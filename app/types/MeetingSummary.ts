/*  Details of the conversation
        When do they want to meet next?
        What needs to be done, by when and by whom?
*/
export interface MeetingSummary {
    nextMeeting: Meeting,
    tasks: Task[]
}

export interface Meeting {
    date: Date,
    time: string,
    location: string,
    attendees: Person[]
}

export interface Task {
    description: string,
    dueDate: Date,
    assignedTo: Person
}

export interface Person {
    name: string,
    email: string
}