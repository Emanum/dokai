<!-- src/routes/account/+page.svelte -->
<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { createEventDispatcher } from "svelte";

    export let data;
    export let form;
    export let size = 10;

    let { session, supabase, documents } = data;
    $: ({ session, supabase, documents } = data);

    let loading = false;
    let uploading = false;
    let files: FileList;

    const dispatch = createEventDispatcher();


    const uploadDocument = async () => {
        try {
            uploading = true;

            if (!files || files.length === 0) {
                throw new Error("You must select an document to upload.");
            }

            const file = files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `${session.user.id}/${Math.random()}.${fileExt}`;

            const { error } = await supabase.storage
                .from("documents")
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            setTimeout(() => {
                dispatch("upload");
            }, 100);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            uploading = false;
        }
    };


</script>

<div>

    <div style="width: {size}em;">
        <label class="button primary block" for="single">
            {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
                style="visibility: hidden; position:absolute;"
                type="file"
                id="single"
                accept="application/pdf, image/*"
                bind:files
                on:change={uploadDocument}
                disabled={uploading}
        />
    </div>

</div>
