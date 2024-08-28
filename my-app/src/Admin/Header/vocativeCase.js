
export const setVocativeCase = (name) => {
    const lastLetter = name.slice(-1)

    switch(true){
        case lastLetter === 'а':
            return name.slice(0, -1) + 'o';
        case lastLetter === 'я':
            return name.slice(0, -1) + 'є';
        case lastLetter === 'о':
            return name.slice(0, -1) + 'е';
        case /[гхк]/.test(lastLetter):
            return name + 'у';
        case /[йь]/.test(lastLetter):
            return name.slice(0, -1) + 'ю';
        case /[а-яА-Я]/.test(lastLetter):
            return name + 'е';
        default:
            return name;
    }
}