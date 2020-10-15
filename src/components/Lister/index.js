import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	const onDeletePost = (id) => {
		const updatedPosts = allPosts.filter(post => {
			return post.id !== id;
		})

		setPosts(updatedPosts);
	}

	const onCreatePost = post => {
		// TODO: implement
	}

	// Show load spinner
	if (loading) {
		return <LoadSpinner/>;
	}

	// Posts exist, display
	if (allPosts && allPosts.length) {
		return (
			<div className="postList">
				{allPosts.map((post, i) => (
					<Post
						title={post.title}
						body={post.body}
						author={post.author}
						onDelete={() => { onDeletePost(post.id) }}
						key={post.id}
					/>
				))}

				<CreatePost />
			</div>
		);
	}

	// No posts exist by default
	if (allPosts && !allPosts.length) {
		return (
			<div className="postList">
				<p>
					No posts available...
				</p>

				<CreatePost />
			</div>
		)
	}

	// Catch anything else
	return (
		<>
			<h1>Oh no!</h1>
			<p>
				Something went wrong. Please try again later.
			</p>
		</>
	)

};

export default Lister;
