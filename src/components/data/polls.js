import shortid from 'shortid'

const polls = [
    {
        id: shortid.generate(),
        title: 'What is Your Favourite Programming Language',
        description: 'There are a lot of programming language. Among them what is your favourite?',
        options: [
            {id: 1, value: 'C Programming', vote: 0},
            {id: 2, value: 'Java', vote: 0},
            {id: 3, value: 'Javascript', vote: 0},
            {id: 4, value: 'Python', vote: 0}
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    },
    {
        id: shortid.generate(),
        title: 'Which Frontend Framework do You Prefer?',
        description: 'Javascrip has a variety of frameworks and libraries. Each and every day we have a new one. Among these which frontend framework you like and prefer others?',
        options: [
            {id: 5, value: 'Angular', vote: 0},
            {id: 6, value: 'React', vote: 0},
            {id: 7, value: 'Vue', vote: 0}
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    },
    {
        id: shortid.generate(),
        title: 'Whai is the Best way to Create Android App',
        description: 'I want to create an android app, but I have no idea and not any proper guidelines. So, how you create an android app and do you prefer any suggest for us',
        options: [
            {id: 8, value: 'React Natieve', vote: 0},
            {id: 9, value: 'Cotlin', vote: 0},
            {id: 10, value: 'Java', vote: 0}
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    }
]

export default polls;