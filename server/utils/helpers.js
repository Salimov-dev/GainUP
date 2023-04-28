function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUserData() {
    return {
        firstName: "Ruslan",
        lastName: "Salimov",
        surName: "Albertovich",
        managerStatus: "525985627245",
        // phoneNumber: "+79215302507",
        created_byUser: "213432143214",
        userAccessRoot: "6415b60c5e563791505e5ed5",
        startDateOfJobOffer: "5324453645",
        expiresDateOfJobOffer: "4321561434",
        sex: "male",
        dateOfStartVacation: "",
        dateOfEndVacation: "",
        quantityOfOpenStore: "1",
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`,
    }
}

module.exports = {
    generateUserData
}