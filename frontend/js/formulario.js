document.addEventListener('DOMContentLoaded', async () => {

    const params = new URLSearchParams(location.search);
    const movieId = params.has('movie') && params.get('movie');

    const formElement = document.querySelector('form');

    try {
        if (movieId) {
            const response = await fetch(`http://localhost:3031/api/movies/${movieId}`);
            const { data: { title, awards, rating, release_date, length } } = await response.json();

            formElement.elements[1].value = title;
            formElement.elements[2].value = rating;
            formElement.elements[3].value = awards;
            formElement.elements[4].value = release_date.split('T')[0];
            formElement.elements[5].value = length;

            params.set('edit', true);
        } else {
            params.set('edit', false);
        }
    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById('btn-add').addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    formElement.onsubmit = async function (event) {
        event.preventDefault();
        const baseUrl = `http://localhost:3031/api/movies`;
        const url = params.get('edit') === "true" ? `${baseUrl}/update/${movieId}` : `${baseUrl}/create`;

        try {
            const response = await fetch(url, {
                method: params.get('edit') === "true" ? 'PUT' : 'POST',
                body: JSON.stringify({
                    title: this.elements[1].value,
                    rating: this.elements[2].value,
                    awards: this.elements[3].value,
                    release_date: this.elements[4].value,
                    length: this.elements[5].value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.meta.status === 200 || result.meta.status === 204) {
                console.log(result.meta.message);
                window.location.href = 'home.html';
            } else {
                console.error(result.meta.message);
            }

            params.set('edit', true);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const btnDelete = document.getElementById('btn-delete');
    btnDelete.addEventListener('click', async () => {
        try {
            const confirmation = await Swal.fire({
                title: '¿Estás seguro de querer eliminar esta película?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar'
            });
            if (confirmation.isConfirmed) {
                const response = await fetch(`http://localhost:3031/api/movies/delete/${movieId}`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                if (result.meta.status === 200) {
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'La película ha sido eliminada.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        window.location.href = 'home.html';
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: result.meta.message,
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo eliminar',
                icon: 'error'
            });
        }
    });

    document.getElementById('btn-add').addEventListener('click', async () => {
        try {
            const baseUrl = `http://localhost:3031/api/movies`;
            const formData = new FormData(formElement);
            const newmovie = {
                title: formData.get('title'),
                rating: formData.get('rating'),
                awards: formData.get('awards'),
                release_date: formData.get('release_date'),
                length: formData.get('length')
            };

            const response = await fetch(`${baseUrl}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newmovie)
            });

            if (response.ok) {
                window.location.href = 'home.html';
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
