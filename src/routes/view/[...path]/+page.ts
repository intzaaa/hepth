export async function load({ params }) {
	const path = '/' + params.path;
	return {
		path
	};
}
