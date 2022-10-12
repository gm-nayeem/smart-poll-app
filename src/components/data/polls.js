import shortid from 'shortid'

const Polls = [
    {
        id: shortid.generate(),
        title: 'What is Your Favourite Programming Language',
        description: 'There are a lot of programming language. Among them what is your favourite?',
        options: [
            {id: shortid.generate(), value: 'C Programming', vote: 0},
            {id: shortid.generate(), value: 'Java', vote: 0},
            {id: shortid.generate(), value: 'Javascript', vote: 0},
            {id: shortid.generate(), value: 'Python', vote: 0},
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
            {id: shortid.generate(), value: 'Angular', vote: 0},
            {id: shortid.generate(), value: 'React', vote: 0},
            {id: shortid.generate(), value: 'Vue', vote: 0},
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
            {id: shortid.generate(), value: 'React Natieve', vote: 0},
            {id: shortid.generate(), value: 'Cotlin', vote: 0},
            {id: shortid.generate(), value: 'Java', vote: 0},
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    }
]

export default Polls;