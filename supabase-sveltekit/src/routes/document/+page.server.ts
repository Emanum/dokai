import {redirect} from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({
                                               locals: {supabase, getSession},
                                           }) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, "/");
    }

    // Query to get document names from the 'documents' bucket in a folder named after the user's ID
    const {data: documents, error} = await supabase
        .storage
        .from('documents')
        .list(`${session.user.id}/`);

    if (error) {
        console.error('Error fetching documents:', error.message);
        return {session, documents: []};
    }

    return {session, documents: documents};
};

export const actions: Actions = {};
