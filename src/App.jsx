import { useState, useEffect } from "react";

const defaultFormData = {
	id: "",
	title: "",
	content: "",
	img: "",
	tags: [],
	category: "",
};

function App() {
	const [list, setList] = useState([]);
	const [formFields, setFormFields] = useState(defaultFormData);

	//fetching dati al caricamento della pagina
	useEffect(() => {
		fetch("http://localhost:3000/posts")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setList(data);
			});
	}, []);

	const handleInputChange = (e) => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (
			!formFields.title ||
			!formFields.img ||
			!formFields.content ||
			!formFields.category
		) {
			alert("inserisci dato");
			return;
		}

		const newList = [...list, formFields];
		setList(newList);

		// resetto il form
		setFormFields(defaultFormData);
	};

	const removePost = (i) => {
		fetch(`http://localhost:3000/posts/ ${i}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setList(data);
			});
	};

	return (
		<>
			<div className="container mt-5">
				<h1 className="mb-3">Blog </h1>
				<form onSubmit={handleFormSubmit}>
					{/* input titolo */}
					<label htmlFor="title" className="form-label">
						Titolo
					</label>
					<input
						id="title"
						className="form-control mb-3"
						type="text"
						name="title"
						value={formFields.title}
						onChange={handleInputChange}
						placeholder="Inserisci un titolo"
					/>

					{/* input immagine */}
					<label htmlFor="img" className="form-label">
						Immagine
					</label>
					<input
						id="img"
						className="form-control mb-3"
						type="text"
						name="img"
						value={formFields.img}
						onChange={handleInputChange}
						placeholder="Inserisci un' immagine"
					/>

					{/* input contenuto */}
					<label htmlFor="content" className="form-label">
						Contenuto
					</label>
					<input
						id="content"
						className="form-control mb-3"
						type="text"
						name="content"
						value={formFields.content}
						onChange={handleInputChange}
						placeholder="Inserisci un contenuto"
					/>

					{/* input categoria */}
					<label htmlFor="category" className="form-label">
						Categoria
					</label>
					<select
						className="form-select mb-3"
						id="category"
						name="category"
						onChange={handleInputChange}
					>
						<option>Seleziona una categoria</option>
						<option value="categoria 1">categoria 1</option>
						<option value="categoria 2">categoria 2</option>
						<option value="categoria 3">categoria 3</option>
					</select>
					<button className="btn btn-primary">Aggiungi Post alla lista</button>
				</form>
				<section className="mb-5">
					<h2 className="mt-3">Post list</h2>
					<div className="row row-cols-2 g-3">
						{list.length ? (
							list.map((el, index) => (
								<div className="col" key={index}>
									<div className="card h-100">
										<img
											src={el.img}
											className="card-img-top img-fluid"
											alt=""
										/>
										<div className="card-body">
											<i
												className="fa-solid fa-trash ms-2"
												onClick={() => removePost(index)}
											></i>
											<h5 className="card-title">{el.title.toUpperCase()}</h5>
											<p className="card-text">
												<h3>Descrizione: {el.content}</h3>
												<h3>{el.category}</h3>
											</p>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="col-12">
								<h4>Nessun post disponibile</h4>
							</div>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

export default App;
