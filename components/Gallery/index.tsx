'use client';

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import axios from 'axios';
import {UnsplashPhoto} from '@/types'
import { Download } from 'lucide-react';

// Replace with your Unsplash API access key
const accessKey = 'frmqlCx2yivc5RryJ4GzzueIytBMtsSCjJqrYq4sc4A';

// interface UnsplashPhoto {
//   id: string;
//   urls: {
//     small: string;
//   };
//   alt_description: string;
//   isLoading: boolean;
// }

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch photos from Unsplash API
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const url = query 
      ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`
      : `https://api.unsplash.com/photos?page=${page}&client_id=${accessKey}`;

    try {
      const response = await axios.get(url);
      const newPhotos: UnsplashPhoto[] = (query ? response.data.results : response.data).map((photo: UnsplashPhoto) => ({
        id: photo.id,
        urls: photo.urls,
        alt_description: photo.alt_description,
        isLoading: true
      }));
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  // Fetch photos on initial render and when page or query changes
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Infinite scrolling logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPage(prevPage => prevPage + 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Handle search input changes
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPhotos([]);
    setPage(1);
  };

  const handleImageLoad = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].isLoading = false;
    setPhotos(updatedPhotos);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-xl">
        <input
          type="text"
          placeholder="Search for photos"
          value={query}
          onChange={handleSearch}
          className="w-full text-gray-900 p-2 mb-4 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, idx) => (
          <div key={idx} className="relative overflow-hidden rounded shadow">
            {photo.isLoading && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
            )}
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className={`w-full h-full object-cover ${photo.isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => handleImageLoad(idx)}
            />
            <a
              href={photo.urls.full}
              download
              target='_blank'
              className="absolute bottom-2 right-2 text-black bg-white p-2 rounded-full shadow-lg"
              title="Download Image"
            >
              <Download size={20} />
            </a>
          </div>
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}
    </div>
  );
};

export default Gallery;
