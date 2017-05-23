/**
 * developer: menangen@gmail.com
 * Date: 17.05.17
 * Time: 15:52
 */

const model = {
    state: {
        description: "Good Cat",
        age: null,
        hasFoodNow: 0,
        pushedCats: [],
        enabledButtons: [],
        cats: []
    },

    fetchCats() {
        // If fetch API is available:
        if (window.fetch) {
            fetch("cats").then(response => {

                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok.");
            })
            .then(djangoJson => {
                model.state.cats = djangoJson;
            })
            .catch(() => {
                console.error("Network Error. Django is running?");
            })
        }

        // Old browsers:
        else {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", "/cats", false);
            xhr.send(null);

            if (xhr.status === 200) model.state.cats = JSON.parse(xhr.responseText);
        }

    },
    deleteCatByIndex(index, catName) {
        model.state.pushedCats.splice(index, 1);
        model.state.enabledButtons.splice(index, 1);

        // ajax
        if (window.fetch) {
            fetch(`/cats/${catName}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) model.fetchCats();
                    else throw new Error("Network response was not ok.");
                })
                .catch(() => {
                    console.error("Network Error. Django is running?")
                })
        }
        // Old browsers:
        else {
            const xhr = new XMLHttpRequest();

            xhr.open("DELETE", `/cats/${catName}`, false);
            xhr.send(null);

            if (xhr.status === 200) model.fetchCats();
            else console.error("Network Error. Django is running?")
        }
    },
    setArrayIndexAsTrue(index) {
        Vue.set(model.state.enabledButtons, index, true)
    },
    setArrayIndexAsFalse(index) {
        Vue.set(model.state.enabledButtons, index, false)
    },
    addCatInTable(catName) {
        for (const cat of model.state.cats) {
            if (catName === cat.catName) {
                model.state.pushedCats.push(cat);
                model.state.enabledButtons.push(false);
            }
        }
    },
    setCatDescription(description) {
        model.state.description = description;
    },
    getCatAgeByRequest(name) {
        if (window.fetch) {
            fetch(`/cats/${name}`)
                .then(response => {

                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error("Network response was not ok.")
                })
                .then(catObjectFromJSON => {
                    model.state.age = catObjectFromJSON.age
                })
                .catch(() => {
                    console.warn("Network Error. Django is running?")
                })
        }
        // Old browsers:
        else {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", `/cats/${name}`, false);
            xhr.send(null);

            if (xhr.status === 200) {
                const catJSON = JSON.parse(xhr.responseText);

                model.state.age = catJSON.age;
            }
        }
    }
};

export default model;