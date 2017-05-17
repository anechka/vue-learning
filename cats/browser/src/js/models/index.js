/**
 * developer: menangen@gmail.com
 * Date: 17.05.17
 * Time: 15:52
 */

const model = {
    state: {
        description: 'Good Cat',
        hasFoodNow: 0,
        pushedCats: [],
        enabledButtons: [],
        cats: []// TODO: Should not be a 'null' object
    },

    fetchCats() {
        // If fetch API is available:
        if (window.fetch) {
            fetch('cats').then(response => {

                if (response.ok) {
                    return response.json();
                }

                console.warn('Network Error. Django is running?');
                throw new Error('Network response was not ok.');

            }).then(djangoJson => {
                model.state.cats = djangoJson;
            })
        }

        // Old browsers:
        else {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', '/cats', false);
            xhr.send(null);

            if(xhr.status === 200) model.state.cats = JSON.parse(xhr.responseText);
        }

    }
};

export default model;