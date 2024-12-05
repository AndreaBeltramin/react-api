import { useState, useEffect } from "react";

const possibleTags = [
	"cucina",
	"antipasto",
	"panificazione",
	"dolce",
	"pasta",
	"primo",
	"dessert",
];
const defaultFormData = {
	id: "",
	title: "",
	content: "",
	img: "",
	tags: [],
	category: "",
	published: false,
};

function App() {
	const [postList, setPostList] = useState([]);
	const [formFields, setFormFields] = useState(defaultFormData);

	//fetching dati al caricamento della pagina
	useEffect(() => {
		fetch("http://localhost:3000/posts")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPostList(data);
			});
	}, []);

	const handleInputChange = (e) => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};

	const handleFormTagsChange = (e) => {
		let newTags = e.target.checked
			? [...formFields.tags, e.target.value]
			: formFields.tags.filter((tag) => tag != e.target.value);

		const newFormFields = { ...formFields, tags: newTags };
		setFormFields(newFormFields);
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

		const newPostList = [...postList, formFields];
		setPostList(newPostList);

		// resetto il form
		setFormFields(defaultFormData);
	};

	const removePost = (id) => {
		fetch("http://localhost:3000/posts/" + id, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPostList(data);
			});
	};

	return (
		<>
			{/* FORM POST SECTION */}
			<div className="container mt-5">
				<h1 className="mb-3">Blog </h1>
				<form onSubmit={handleFormSubmit}>
					<div className="row g-3">
						{/* INPUT TITOLO */}
						<div className="col-3">
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
						</div>

						{/* INPUT CONTENUTO */}
						<div className="col-3">
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
						</div>

						{/* INPUT IMMAGINE */}
						<div className="col-3">
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
						</div>

						{/* INPUT TAGS */}
						<div className="col-3">
							<label className="form-label row">Tags</label>
							{possibleTags.map((tag, index) => (
								<div key={index} className="form-check form-check-inline">
									<label>
										<input
											type="checkbox"
											name="tags"
											value={tag}
											className="me-2 form-check-input"
											checked={formFields.tags.includes(tag)}
											onChange={handleFormTagsChange}
										/>
										{tag}
									</label>
								</div>
							))}
						</div>

						{/* INPUT CATEGORIA */}
						<div className="col-3">
							<label htmlFor="category" className="form-label">
								Categoria
							</label>
							<select
								className="form-select mb-3"
								id="category"
								name="category"
								onChange={handleInputChange}
							>
								<option value="">Scegli una categoria</option>
								<option value="panificati">panificati</option>
								<option value="primo piatto">primo piatto</option>
								<option value="dessert">dessert</option>
							</select>
							<button className="btn btn-primary">
								Aggiungi Post alla lista
							</button>
						</div>
					</div>
				</form>

				{/* LIST POST SECTION */}
				<section className="mb-5">
					<h2 className="mt-3">Post list</h2>
					<div className="row row-cols-2 g-3">
						{postList.length ? (
							postList.map((post, index) => (
								<div className="col" key={index}>
									<div className="card h-100">
										<img
											src={post.img}
											className="card-img-top img-fluid"
											alt=""
										/>
										<div className="card-body">
											<h2 className="card-title text-danger">
												{post.title.toUpperCase()}
											</h2>
											<div className="card-text">
												<h4>Descrizione: {post.content}</h4>
												<h4>Categoria: {post.category}</h4>
												{post.tags.map((tag, index) => (
													<span
														key={index}
														className="badge text-bg-success me-2 mb-2"
													>
														<h6>{tag}</h6>
													</span>
												))}
											</div>
											<i
												className="fa-solid fa-trash ms-2"
												onClick={() => removePost(post.id)}
											></i>
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
