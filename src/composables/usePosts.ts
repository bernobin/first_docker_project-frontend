import { ref } from 'vue';
import { PostApi } from '@/api/PostApi';
import type { Post, PostInput } from '@/types/post';

export function usePosts() {
    const controller = new PostApi();

    const posts = ref<Post[]>([]);
    const loading = ref(false);
    const saving = ref(false);
    const error = ref<string | null>(null);

    async function loadPosts(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            posts.value = await controller.getPosts();
        } catch (err) {
            error.value = getErrorMessage(err);
        } finally {
            loading.value = false;
        }
    }

    async function savePost(id: number | null, data: PostInput): Promise<void> {
        saving.value = true;
        error.value = null;

        try {
            if (id === null) {
                const post = await controller.createPost(data);

                posts.value.push(post);
            } else {
                const post = await controller.updatePost(id, data);

                const index = posts.value.findIndex((item) => item.id === id);

                if (index !== -1) {
                    posts.value[index] = post;
                }
            }
        } catch (err) {
            error.value = getErrorMessage(err);
            throw err;
        } finally {
            saving.value = false;
        }
    }

    async function removePost(id: number): Promise<void> {
        error.value = null;

        try {
            await controller.deletePost(id);

            posts.value = posts.value.filter((post) => post.id !== id);
        } catch (err) {
            error.value = getErrorMessage(err);
        }
    }

    return {
        posts,
        loading,
        saving,
        error,
        loadPosts,
        savePost,
        removePost,
    };
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'An unexpected error occurred';
}
