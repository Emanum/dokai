<!-- src/routes/document/DocumentEntry.svelte -->
<script lang="ts">
    import type {SupabaseClient} from "@supabase/supabase-js";

    export let document_entry; //supabase storage document
    export let supabase: SupabaseClient;

    const downloadDocument = async () => {
        let user = await supabase.auth.getUser();
        let path = `${user.data.user?.id}/${document_entry.name}`
        const {data, error} = await supabase.storage.from('documents').download(path);
        if (error) {
            console.error('Error downloading document', error);
        } else {
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.download = document_entry.name;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url); // Object URLs should be revoked after use
        }
    }

    const removeDocument = async () => {
        let user = await supabase.auth.getUser();
        let path = `${user.data.user?.id}/${document_entry.name}`
        const {data, error} = await supabase.storage.from('documents').remove([path]);
        if (error) {
            console.error('Error removing document', error);
        } else {
            console.log('Document removed', data);
        }
    }

</script>


<article>
    <h2>{document_entry.name}</h2>
    <p>Updated at {document_entry.updated_at}</p>
    <p>Created at {document_entry.created_at}</p>
    <p>Last access at {document_entry.last_accessed_at}</p>
    <h3>Metadata</h3>
    <ul>
        {#each Object.entries(document_entry.metadata) as [key, value]}
            <li>{key}: {value}</li>
        {/each}
    </ul>
    <button on:click={downloadDocument}>Download</button>
    <button on:click={removeDocument}>Remove</button>
</article>