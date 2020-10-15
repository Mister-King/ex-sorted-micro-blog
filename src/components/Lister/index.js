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
		// TODO: implement
	}

	const onCreatePost = post => {
		// TODO: implement
	}

	// TODO: implement render method, using Post and CreatePost e.g.
	//				...
	// 				<div className="postList">
	//					...
	//					<CreatePost />
	// 				</div>
	//				...
	//

	// Show load spinner by default
	return <LoadSpinner />;
};

export default Lister;
