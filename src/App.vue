<script lang="ts">
import { defineComponent } from 'vue';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface PostForm {
    title: string;
    content: string;
}

export default defineComponent({
    name: 'App',

    data(): {
        apiUrl: string;
        posts: Post[];
        loading: boolean;
        error: string;
        editingId: number | null;
        form: PostForm;
    } {
        return {
            apiUrl: 'api/posts',

            posts: [],
            loading: false,
            error: '',

            editingId: null,

            form: {
                title: '',
                content: '',
            },
        };
    },

    mounted() {
        this.loadPosts();
    },

    methods: {
        async loadPosts(): Promise<void> {
            this.loading = true;
            this.error = '';

            try {
                const response = await fetch(this.apiUrl);

                if (!response.ok) throw new Error('Failed to load posts');

                this.posts = await response.json();
            } catch (error: unknown) {
                this.error = error instanceof Error ? error.message : 'Failed to load posts';
            } finally {
                this.loading = false;
            }
        },

        async savePost(): Promise<void> {
            this.error = '';

            if (!this.form.title.trim() || !this.form.content.trim()) {
                this.error = 'Please enter both a title and content.';
                return;
            }

            const isEditing = this.editingId !== null;

            try {
                const response = await fetch(
                    isEditing ? `${this.apiUrl}/${this.editingId}` : this.apiUrl,
                    {
                        method: isEditing ? 'PUT' : 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: this.form.title,
                            content: this.form.content,
                        }),
                    }
                );

                if (!response.ok)
                    throw new Error(isEditing ? 'Failed to update post' : 'Failed to create post');

                await this.loadPosts();
                this.resetForm();
            } catch (error: unknown) {
                this.error = error instanceof Error ? error.message : 'Failed to save posts';
            }
        },

        editPost(post: Post): void {
            this.editingId = post.id;

            this.form.title = post.title;
            this.form.content = post.content;

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },

        async deletePost(id: number): Promise<void> {
            if (!confirm('Are you sure you want to delete this post?')) return;

            this.error = '';

            try {
                const response = await fetch(`${this.apiUrl}/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Failed to delete post');

                await this.loadPosts();

                if (this.editingId === id) {
                    this.resetForm();
                }
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Failed to delete posts';
            }
        },

        resetForm(): void {
            this.editingId = null;

            this.form.title = '';
            this.form.content = '';
        },
    },
});
</script>

<template>
    <div class="app">
        <header class="header">
            <div class="container">
                <h1>My Blog</h1>
                <p>A simple Vue CRUD application</p>
            </div>
        </header>

        <main class="container">
            <!-- Create / Edit form -->
            <section class="card">
                <div class="section-header">
                    <h2>
                        {{ editingId !== null ? 'Edit Post' : 'New Post' }}
                    </h2>

                    <button
                        v-if="editingId !== null"
                        class="button button-secondary"
                        @click="resetForm"
                    >
                        Cancel
                    </button>
                </div>

                <form @submit.prevent="savePost">
                    <div class="form-group">
                        <label for="title">Title</label>

                        <input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="Enter a title..."
                        />
                    </div>

                    <div class="form-group">
                        <label for="content">Content</label>

                        <textarea
                            id="content"
                            v-model="form.content"
                            rows="5"
                            placeholder="Write something..."
                        ></textarea>
                    </div>

                    <button class="button button-primary" type="submit">
                        {{ editingId !== null ? 'Update Post' : 'Create Post' }}
                    </button>
                </form>
            </section>

            <!-- Error -->
            <div v-if="error" class="error">
                {{ error }}
            </div>

            <!-- Posts -->
            <section class="posts-section">
                <div class="section-header">
                    <h2>Posts</h2>

                    <button class="button button-secondary" @click="loadPosts">Refresh</button>
                </div>

                <div v-if="loading" class="empty-state">Loading posts...</div>

                <div v-else-if="posts.length === 0" class="empty-state">
                    <p>No posts yet.</p>
                    <p>Create your first post above.</p>
                </div>

                <div v-else class="posts">
                    <article v-for="post in posts" :key="post.id" class="post-card">
                        <div class="post-content">
                            <h3>{{ post.title }}</h3>
                            <p>{{ post.content }}</p>
                        </div>

                        <div class="post-actions">
                            <button class="button button-secondary" @click="editPost(post)">
                                Edit
                            </button>

                            <button class="button button-danger" @click="deletePost(post.id)">
                                Delete
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    </div>
</template>
