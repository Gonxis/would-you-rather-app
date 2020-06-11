export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion(question, author, authedUser) {
    const { id, timestamp, optionOne, optionTwo } = question
    const { name, avatarURL } = author
    const votes = optionOne.votes.length + optionTwo.votes.length;

    return {
        name,
        id,
        timestamp,
        avatar: avatarURL,
        votes,
        hasVotes: votes !== 0,
        yourVote: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
        options: {
            values: [optionOne.text, optionTwo.text],
            optionOneValue: optionOne.text,
            optionOneVotes: [...optionOne.votes],
            optionTwoValue: optionTwo.text,
            optionTwoVotes: [...optionTwo.votes]
        }
    }
}