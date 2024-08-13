type Photos = {
  id: number;
  user_id: string;
  user_name: string;
  user_avatar: string;
  photo_url: string;
  title: string;
  location: string;
  likes: number;
  created_at: string;
  rank?: number;
};

export default Photos;
