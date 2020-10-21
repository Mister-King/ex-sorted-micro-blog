import React, {useReducer, useState} from 'react';
import './CreatePost.css';

const CreatePost = ({ onCreate }) => {
	const initialState = {
		title: '',
		body: '',
		author: ''
	};

	const [errors, setErrors] = useState(false);

	const postReducer = (state, { type, ...payload } ) => {
		switch (type) {
			case 'update':
				if (errors) { setErrors(false); }
				return {
					...state,
					[payload.key]: payload.value
				};
			case 'reset':
				setErrors(false);
				return {
					title: '',
					body: '',
					author: ''
				};
			default:
				return state; // Questionable practise as an error will be more useful. There should never be an missing case.
		}
	};

	const handleAddPost = () => {
		if (title === '' || body === '' || author === '') {
			setErrors(true);
			return false;
		}

		onCreate({ title, body, author });
		dispatch({ type: 'reset'})
	}

	const [{title, body, author}, dispatch] = useReducer(postReducer, initialState)

	return (
		<form aria-label="Create post">
			<fieldset>
				<h3>Add new post</h3>
				<ul>
					<li>
						<label htmlFor="title">Title</label>
						<input type="text" id="title" value={title} onChange={({ target: { value } }) => dispatch({ type: 'update', key: 'title', value })}/>
					</li>
					<li>
						<label htmlFor="body">Body</label>
						<textarea id="body" value={body} onChange={({ target: { value } }) => dispatch({type: 'update', key: 'body', value})}></textarea>
					</li>
					<li>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" value={author} onChange={({ target: { value } }) => dispatch({ type: 'update', key: 'author', value })}/>
					</li>

					{errors &&
					<li>
						<p className="error">All fields must be entered!</p>
					</li>
					}
				</ul>

				<button type="button" onClick={handleAddPost}>Add post</button>
				<button type="button" onClick={() => dispatch({ type: 'reset'})}>Reset</button>
			</fieldset>
		</form>
	);
};

export default CreatePost;
