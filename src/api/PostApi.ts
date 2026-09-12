import { HttpClient } from './HttpClient';
import type { Post, PostInput } from '@/types/post';

export class PostApi extends HttpClient {
    private readonly baseUrl = '/api/posts';

    async getPosts(): Promise<Post[]> {
        return this.get<Post[]>(this.baseUrl);
    }

    async createPost(data: PostInput): Promise<Post> {
        return this.post<Post>(this.baseUrl, data);
    }

    async updatePost(id: number, data: PostInput): Promise<Post> {
        return this.put<Post>(`${this.baseUrl}/${id}`, data);
    }

    async deletePost(id: number): Promise<void> {
        return this.delete<void>(`${this.baseUrl}/${id}`);
    }
}
