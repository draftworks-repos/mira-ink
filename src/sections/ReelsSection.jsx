import React, { useState, useRef } from 'react';
import { Instagram, ArrowUpRight, Upload } from 'lucide-react';
import SectionHead from '../components/SectionHead.jsx';
import ReelTile from '../components/ReelTile.jsx';
import { reels as initialReels } from '../data/reels.js';
import { site } from '../data/site.js';
import './ReelsSection.css';

export default function ReelsSection() {
  const [reelsList, setReelsList] = useState(initialReels);
  const [playingId, setPlayingId] = useState(null);
  const fileInputRef = useRef(null);

  const headline = [
    <span>FRESH FROM</span>,
    <span>
      THE <em className="serif-accent">feed.</em>
    </span>
  ];

  const handleTogglePlay = (id) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const videoUrl = URL.createObjectURL(file);
    const newReel = {
      id: `custom-${Date.now()}`,
      src: videoUrl,
      poster: reelsList[0]?.poster || '/temp/reels/reel-01.jpg',
      views: 'LIVE',
      caption: `Uploaded Mockup: ${file.name.replace(/\.[^/.]+$/, "")}`,
      style: 'Custom Clip',
      igUrl: site.instagramUrl
    };

    // Replace first reel with uploaded video and trigger play
    setReelsList((prev) => [newReel, ...prev.slice(1)]);
    setPlayingId(newReel.id);
  };

  const actions = (
    <div className="reels-section__actions-bar">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleVideoFileChange}
        accept="video/mp4,video/webm,video/quicktime,video/*"
        style={{ display: 'none' }}
        aria-label="Upload mockup reel video"
      />

      <button
        type="button"
        onClick={handleUploadClick}
        className="reels-section__upload-btn label-type"
        title="Upload your own mockup video to preview live"
      >
        <Upload size={14} />
        <span>Upload Mockup Video</span>
      </button>

      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="reels-section__follow-btn label-type"
      >
        <Instagram size={15} />
        <span>Follow {site.handle}</span>
      </a>
    </div>
  );

  return (
    <section id="reels" className="reels-section section section--char section--below-fold" aria-labelledby="reels-head">
      <div className="container">
        <SectionHead
          number="01"
          label="REELS"
          lines={headline}
          action={actions}
          theme="dark"
        />

        {/* Uniform 4-col desktop, 2-col tablet grid (8 equal slots) */}
        <div className="reels-section__grid">
          {reelsList.map((reel) => (
            <div key={reel.id} className="reels-section__item">
              <ReelTile
                reel={reel}
                isPlaying={playingId === reel.id}
                onTogglePlay={handleTogglePlay}
              />
            </div>
          ))}

          {/* 8th Slot: More on Instagram Card (Identical 9:16 aspect ratio & dimensions) */}
          <div className="reels-section__item reels-section__item--more">
            <div className="reels-section__more-wrapper">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="reels-section__more-tile"
                aria-label="View more videos on Instagram"
              >
                <div className="reels-section__more-inner">
                  <div className="reels-section__more-icon-box">
                    <Instagram size={32} className="reels-section__more-icon" />
                  </div>
                  <span className="display-type reels-section__more-text">
                    MORE ON INSTAGRAM
                  </span>
                  <span className="label-type reels-section__more-handle">
                    {site.handle}
                  </span>
                  <span className="reels-section__more-cta label-type">
                    <span>Explore Feed</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
              <div className="reels-section__more-dummy-btn label-type" aria-hidden="true">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
