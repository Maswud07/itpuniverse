import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  Calendar, 
  PenTool, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  AlertCircle, 
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';

interface PostComment {
  id: string;
  writer: string;
  content: string;
  date: string;
}

interface ForumPost {
  id: string;
  isNotice: boolean;
  category: 'Notice' | 'TOEFL' | 'IELTS' | 'PTE' | 'Free Topic';
  title: string;
  writer: string;
  likes: number;
  date: string;
  timestamp: number; // for sorting
  views: number;
  comments: PostComment[];
  content: string;
  isVerifiedWriter?: boolean;
}

interface CommunityPageProps {
  onNavigateTab: (tab: string) => void;
}

const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'notice-1',
    isNotice: true,
    category: 'Notice',
    title: 'Important Notice: Privacy Protection',
    writer: 'ITP',
    isVerifiedWriter: true,
    likes: 0,
    date: '04.24',
    timestamp: 1774396800,
    views: 90,
    comments: [],
    content: 'Hello. ITP Support Team. To protect your valuable personal information, please regularly update your password and review our latest security guidelines. If you notice any suspicious browser login activity or unauthorized access, please contact our customer center immediately.'
  },
  {
    id: 'notice-2',
    isNotice: true,
    category: 'Notice',
    title: '[Issue Resolved] Writing - Practice Questions: Build a Sentence',
    writer: 'ITP',
    isVerifiedWriter: true,
    likes: 1,
    date: '02.19',
    timestamp: 1772668800,
    views: 422,
    comments: [],
    content: 'Some errata and guidelines for the "Build a Sentence" questions in the TOEFL and IELTS Writing practice section have been updated. We apologize for the inconvenience and will strive to provide a more stable scoring engine.'
  },
  {
    id: 'notice-3',
    isNotice: true,
    category: 'Notice',
    title: '🎉 May 2026 Mock Test Challenge & Review Event Winner Announcement',
    writer: 'ITP',
    isVerifiedWriter: true,
    likes: 2,
    date: '02.10',
    timestamp: 1772496000,
    views: 416,
    comments: [
      { id: 'c-1', writer: 'ko*****', content: 'Congratulations!', date: '02.10' }
    ],
    content: 'We are announcing the results of the Mock Test Study King event for our active participants in May. The 100 lucky winners have been sent smart coupons for a free 30-day ITP Premium Pass via LMS text message.'
  },
  {
    id: 'notice-4',
    isNotice: true,
    category: 'Notice',
    title: '📢 (Cancellation & Refund) Cancellation & Refund Request Procedure',
    writer: 'ITP Universe',
    isVerifiedWriter: true,
    likes: 2,
    date: '02.06',
    timestamp: 1772150400,
    views: 238,
    comments: [
      { id: 'c-2', writer: 'sy*****', content: 'The refund process is very intuitive. Thank you.', date: '02.07' }
    ],
    content: 'Cancellations and full refunds are supported within 7 days of payment for ITP Universe plans for unused tests. You can easily proceed by clicking the user icon in the top right corner and navigating to [Payment History Management] -> [Cancel Vision Plan].'
  },
  {
    id: 'notice-5',
    isNotice: true,
    category: 'Notice',
    title: 'ITP Universe Community Board Rules',
    writer: 'ITP Universe',
    isVerifiedWriter: true,
    likes: 2,
    date: '02.21',
    timestamp: 1773014400,
    views: 833,
    comments: [],
    content: 'Welcome to the ITP Universe Official Community Board! Please maintain polite respect, avoid self-promotional spam link triggers, and protect candidate privacy. Violating postings will be warning-flagged and deleted by administrators immediately.'
  },
  {
    id: 'post-1',
    isNotice: false,
    category: 'Free Topic',
    title: 'Writing',
    writer: 'xi******',
    likes: 0,
    date: '42 minutes ago',
    timestamp: 1781298120,
    views: 4,
    comments: [
      { id: 'c-3', writer: 'ma*****', content: 'Good information!', date: '30 minutes ago' }
    ],
    content: 'My writing score is stuck at 22, is it harmful to focus mainly on memorizing templates? I heard the latest trend is to practice rewriting after getting correction feedback. I would like to hear your thoughts.'
  },
  {
    id: 'post-2',
    isNotice: false,
    category: 'TOEFL',
    title: 'Anyone taking TOEFL for US grad school? What is your target score...',
    writer: 'tt******',
    likes: 0,
    date: '1 hour(s) ago',
    timestamp: 1781294400,
    views: 8,
    comments: [
      { id: 'c-4', writer: 'pa*****', content: 'I am aiming for 100 points!', date: '30 minutes ago' }
    ],
    content: 'They say that major top-tier accredited departments require at least 100 points, and 26+ in Speaking for TA scholarships. How is everyone supplementing your Speaking subjects?'
  },
  {
    id: 'post-3',
    isNotice: false,
    category: 'TOEFL',
    title: 'Does it lower my score if I get the first part (module 1) wrong?',
    writer: 'sn******',
    likes: 2,
    date: '06.12',
    timestamp: 1781222400,
    views: 52,
    comments: [
      { id: 'c-5', writer: 'ko*****', content: 'Yes, the initial weighting is high.', date: '06.12' },
      { id: 'c-6', writer: 'us*****', content: 'Thank you for your answer!', date: '06.12' }
    ],
    content: 'I heard that due to the nature of mock tests or AI adaptive tests, the weight of the next set depends on the correct answer rate of the initial questions. I wonder if the initial question weighting is significantly high in the TestGlider official mock test scoring design.'
  },
  {
    id: 'post-4',
    isNotice: false,
    category: 'Free Topic',
    title: 'Took the Solar Knight Mock Test!',
    writer: 'ck******',
    likes: 1,
    date: '06.11',
    timestamp: 1781136000,
    views: 22,
    comments: [
      { id: 'c-7', writer: 'me*****', content: 'Congratulations!', date: '06.11' }
    ],
    content: 'The reading set in this Solar Knight mock test felt a bit difficult, and I am shocked my score dropped by about 3 points compared to usual. I want to compare it with other people\'s average scores to use as a reference for my study.'
  },
  {
    id: 'post-5',
    isNotice: false,
    category: 'TOEFL',
    title: 'How many minutes does everyone usually take for Reading task 1??',
    writer: 'wj******',
    likes: 2,
    date: '06.11',
    timestamp: 1781136000,
    views: 48,
    comments: [
      { id: 'c-8', writer: 'ki*****', content: 'I set a time limit of 18 minutes per passage.', date: '06.11' },
      { id: 'c-9', writer: 'gl*****', content: '18 minutes is quite relaxed.', date: '06.11' },
      { id: 'c-10', writer: 'ro*****', content: 'I strongly recommend memorizing all the vocabulary in advance.', date: '06.11' },
      { id: 'c-11', writer: 'wi*****', content: 'True, vocabulary is 90%.', date: '06.11' },
      { id: 'c-12', writer: 'ha*****', content: 'I am also studying hard on the weekend.', date: '06.11' }
    ],
    content: 'Maybe because a huge amount of information comes in during the first reading passage, every time I check the clock, 22 minutes have passed. If this happens, I end up guessing on the second passage. I desperately ask for your know-how on speed reading/skimming.'
  },
  {
    id: 'post-6',
    isNotice: false,
    category: 'TOEFL',
    title: 'Took the June Solar Knight Mock Test',
    writer: 'yo******',
    likes: 1,
    date: '06.10',
    timestamp: 1781049600,
    views: 19,
    comments: [
      { id: 'c-13', writer: 'an*****', content: 'Good job!', date: '06.10' }
    ],
    content: 'The number of incorrect answers in Listening decreased by 2 compared to last month, which is a bit of a result. It is rewarding that investing 1 hour in shadowing every day seems to have led to an overall score increase.'
  },
  {
    id: 'post-7',
    isNotice: false,
    category: 'TOEFL',
    title: 'Took the June Solar Knight Mock Test',
    writer: 'ka******',
    likes: 1,
    date: '06.10',
    timestamp: 1781049600,
    views: 15,
    comments: [
      { id: 'c-14', writer: 'tu*****', content: 'Good job on finishing.', date: '06.10' }
    ],
    content: 'I was embarrassed because I thought there was a slight audio buffering in the middle, but I finished solving the problem stably. Practice is indeed the best strategy.'
  },
  {
    id: 'post-8',
    isNotice: false,
    category: 'TOEFL',
    title: 'Took the June Solar Knight Mock Test',
    writer: 'ze******',
    likes: 1,
    date: '06.10',
    timestamp: 1781049600,
    views: 18,
    comments: [
      { id: 'c-15', writer: 'st*****', content: 'Wishing you a high score!', date: '06.10' }
    ],
    content: 'Speaking section was the biggest hurdle, but after imitating and memorizing the ITP passage example feedback solutions, my intonation is much smoother when I do self-feedback on the actual recording.'
  },
  {
    id: 'post-9',
    isNotice: false,
    category: 'PTE',
    title: 'PROBLEMS IN THE WRITING GRADING PTE',
    writer: 'da******',
    likes: 0,
    date: '06.10',
    timestamp: 1781049600,
    views: 18,
    comments: [
      { id: 'c-16', writer: 'tg*****', content: 'We are investigating this writing rubric and will update you!', date: '06.10' }
    ],
    content: 'On the PTE mock essay submission, my cohesion metric came back lower even though I utilized the academic linkers template accurately. Please double-check if the automatic scoring rules have any mismatch with Pearson official rubrics.'
  },
  {
    id: 'post-10',
    isNotice: false,
    category: 'Free Topic',
    title: 'Took the June Solar Knight Mock Test.',
    writer: 'cs******',
    likes: 2,
    date: '06.09',
    timestamp: 1780963200,
    views: 20,
    comments: [
      { id: 'c-17', writer: 'le*****', content: 'Great job!', date: '06.09' }
    ],
    content: 'I finished all subjects of the Solar Knight set today. As soon as I finish, the total score review and improvement package report come out immediately, so it feels like it saves twice as much time as going to a tutoring academy.'
  },
  {
    id: 'post-11',
    isNotice: false,
    category: 'TOEFL',
    title: 'Took the June Solar Knight Mock Test.',
    writer: 'le******',
    likes: 1,
    date: '06.09',
    timestamp: 1780963200,
    views: 17,
    comments: [
      { id: 'c-18', writer: 'gl*****', content: 'I just finished it too!', date: '06.09' }
    ],
    content: 'TOEFL definitely requires physical stamina. After staring at the monitor for 2 hours, my eyes hurt. Everyone, take your supplements or do eye massages.'
  }
];

export default function CommunityPage({ onNavigateTab }: CommunityPageProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'Newest' | 'Views' | 'Likes'>('Newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('tg_community_posts_2026');
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  });

  const [activePost, setActivePost] = useState<ForumPost | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Create Post Modal states
  const [writeModalOpen, setWriteModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'TOEFL' | 'IELTS' | 'PTE' | 'Free Topic'>('TOEFL');
  const [newContent, setNewContent] = useState<string>('');
  const [newWriter, setNewWriter] = useState<string>('');

  // Comment Creation state
  const [newCommentContent, setNewCommentContent] = useState<string>('');

  // Save to persistent local storage on modification
  const savePosts = (updatedPosts: ForumPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('tg_community_posts_2026', JSON.stringify(updatedPosts));
  };

  // Filter posts based on category selection
  const categoryFiltered = selectedTag === 'All'
    ? posts 
    : posts.filter(post => post.category === selectedTag);

  // Apply Search filter
  const searchFiltered = categoryFiltered.filter(post => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') return true;
    return post.title.toLowerCase().includes(query) || 
           post.content.toLowerCase().includes(query) ||
           post.writer.toLowerCase().includes(query);
  });

  // Apply sorting rules
  const sortedPosts = [...searchFiltered].sort((a, b) => {
    // Notices always stay pinned on top
    if (a.isNotice && !b.isNotice) return -1;
    if (!a.isNotice && b.isNotice) return 1;

    if (sortOption === 'Views') {
      return b.views - a.views;
    }
    if (sortOption === 'Likes') {
      return b.likes - a.likes;
    }
    // Default to Newest (timestamp descending)
    return b.timestamp - a.timestamp;
  });

  // Pagination setups (20 posts per page, high density)
  const postsPerPage = 12;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Like action helper
  const handleLikePost = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    savePosts(updated);
    if (activePost && activePost.id === postId) {
      setActivePost({ ...activePost, likes: activePost.likes + 1 });
    }
  };

  // Increment view count when opening detailed post modal
  const handleOpenPostDetails = (post: ForumPost) => {
    const updated = posts.map(p => {
      if (p.id === post.id) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    savePosts(updated);
    setActivePost({ ...post, views: post.views + 1 });
  };

  // Submit new post
  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please fill in both the title and context fields.');
      return;
    }

    const assignedWriter = newWriter.trim() ? `${newWriter.trim()}******` : 'an******';
    const newEntry: ForumPost = {
      id: `user-post-${Date.now()}`,
      isNotice: false,
      category: newCategory,
      title: newTitle.trim(),
      writer: assignedWriter,
      likes: 0,
      date: 'Today',
      timestamp: Math.floor(Date.now() / 1000),
      views: 1,
      comments: [],
      content: newContent.trim()
    };

    const updated = [newEntry, ...posts];
    savePosts(updated);
    
    // Clear fields
    setNewTitle('');
    setNewContent('');
    setNewWriter('');
    setWriteModalOpen(false);
    
    alert('Congratulations! Your academic query has been successfully posted to the forum board.');
  };

  // Submit comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;
    if (!activePost) return;

    const newComment: PostComment = {
      id: `comment-${Date.now()}`,
      writer: 'me******',
      content: newCommentContent.trim(),
      date: 'Just now'
    };

    const updatedComments = [...activePost.comments, newComment];
    const updatedPost = { ...activePost, comments: updatedComments };

    // Update in list
    const updatedList = posts.map(p => {
      if (p.id === activePost.id) {
        return updatedPost;
      }
      return p;
    });

    savePosts(updatedList);
    setActivePost(updatedPost);
    setNewCommentContent('');
  };

  return (
    <div className="w-full text-slate-800 pb-16 font-sans text-left animate-fade-in" id="tg-community-board-module">
      
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 mt-4">
        
        {/* ==================== LEFT NAVIGATION WORKSPACE COLUMN ==================== */}
        <div className="space-y-6" id="community-sidebar-workspace">
          
          {/* Write Post Main Black Button matching screenshot */}
          <button
            onClick={() => {
              setNewCategory('TOEFL');
              setWriteModalOpen(true);
            }}
            className="w-full py-3 bg-[#111827] hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-98 shadow-sm cursor-pointer select-none"
            id="write-post-sidebar-action"
          >
            <PenTool className="w-4 h-4 text-blue-400" />
            <span>Write Post</span>
          </button>

          {/* Reviews sidebar box */}
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-center justify-between cursor-pointer group hover:bg-slate-100/50 transition-colors" onClick={() => onNavigateTab('Home')}>
            <span className="text-xs font-black text-slate-700 font-sans">Reviews</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Categories select checklist matching screenshot exactly */}
          <div className="space-y-2">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1 block">
              Community
            </span>
            <div className="flex flex-col space-y-1" id="community-nav-pills">
              {['All', 'TOEFL', 'IELTS', 'PTE', 'Free Topic'].map(cat => {
                const isSelected = selectedTag === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedTag(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat === 'All' 
                        ? posts.length 
                        : posts.filter(p => p.category === cat).length
                      }
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Support Banner Card with arrow link matching screenshot */}
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-left space-y-3">
            <div className="space-y-1">
              <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider block">Get in touch with ITP Universe</span>
              <span className="text-xs font-black text-slate-800 block">Contact Us</span>
            </div>
            
            <button
              onClick={() => {
                alert('ITP Universe Instant Customer Help Desk: Feel free to drop query notes regarding licensing, mock test limits, or study material bugs at support@itp.com.');
              }}
              className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-3xs group"
              title="Speak with Customer Support"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* ==================== RIGHT MAIN LIST WORKSPACE AREA ==================== */}
        <div className="space-y-5" id="community-main-board">
          
          {/* Main Titles Board Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight font-sans">
                All Posts Board
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-[12px] font-bold text-slate-500">
                  Found: {searchFiltered.length} entries registered
                </span>
                {searchQuery && (
                  <span className="text-xs text-blue-600 font-extrabold bg-blue-50 border border-blue-100 px-2 py-0.2 rounded">
                    Query: "{searchQuery}"
                  </span>
                )}
              </div>
            </div>

            {/* Filter tags & search bar input */}
            <div className="flex items-center gap-3">
              
              {/* Global search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search titles, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8.5 pr-3 py-1.5 bg-white border border-slate-200.5 rounded-lg text-xs placeholder-slate-400 text-slate-800 focus:outline-hidden focus:border-blue-400 w-44 transition-all"
                />
              </div>

              {/* Sorting filters precisely from screenshot: "Newest", "Most Viewed", "Most Liked" */}
              <div className="flex bg-slate-100 p-1 rounded-lg text-[11px] font-bold" id="board-sorting-tabs">
                {[
                  { id: 'Newest', label: 'Newest' },
                  { id: 'Views', label: 'Most Viewed' },
                  { id: 'Likes', label: 'Most Liked' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortOption(opt.id as any);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded transition-all cursor-pointer ${
                      sortOption === opt.id
                        ? 'bg-white text-slate-900 shadow-3xs font-black'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* ==================== THE HIGH DENSITY POSTS LIST BOARD TABLE ==================== */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-3xs" id="tg-posts-table-panel">
            
            {/* Table Header labels matching exactly: Post, Writer, Likes, Date, Views */}
            <div className="bg-slate-50 border-b border-slate-100 py-3 px-5 grid grid-cols-[1fr_120px_60px_90px_60px] gap-4 text-[11px] font-black uppercase text-slate-400 tracking-wider">
              <span>Post</span>
              <span className="text-center">Writer</span>
              <span className="text-center">Likes</span>
              <span className="text-center">Date</span>
              <span className="text-center">Views</span>
            </div>

            {/* List entries */}
            <div className="divide-y divide-slate-100">
              {paginatedPosts.map((post) => {
                const commentCount = post.comments.length;
                
                return (
                  <div
                    key={post.id}
                    onClick={() => handleOpenPostDetails(post)}
                    className={`grid grid-cols-[1fr_120px_60px_90px_60px] gap-4 items-center py-3 px-5 text-xs text-slate-700 hover:bg-slate-50/70 transition-colors cursor-pointer select-none font-sans ${
                      post.isNotice ? 'bg-emerald-50/20' : 'bg-white'
                    }`}
                  >
                    
                    {/* Left: Indicator Tag & Title & Comments count */}
                    <div className="flex items-center space-x-3 text-left overflow-hidden">
                      {/* Badge representation */}
                      {post.isNotice ? (
                        <span className="bg-[#10B981] text-white font-extrabold text-[9.5px] px-2 py-0.8 rounded-sm tracking-wide shrink-0">
                          Notice
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-[#475569] border border-slate-200/50 font-extrabold text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider shrink-0 min-w-[65px] text-center">
                          {post.category}
                        </span>
                      )}

                      {/* Post title & Comments count pill */}
                      <p className="font-bold text-slate-800 truncate hover:text-blue-600 cursor-pointer text-[12px]">
                        {post.title}
                        {commentCount >= 0 && (
                          <span className="text-blue-600 font-extrabold text-[11px] ml-1.5 font-mono">
                            ({commentCount})
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Writer name with check icon if verified */}
                    <div className="flex items-center justify-center space-x-1 font-semibold text-[#475569] text-[11.5px] text-center truncate">
                      {post.isVerifiedWriter && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-current text-[#FFF] shrink-0" />
                      )}
                      <span className={post.isVerifiedWriter ? 'text-blue-700 font-extrabold' : ''}>
                        {post.writer}
                      </span>
                    </div>

                    {/* Likes */}
                    <div className="text-center font-bold text-slate-500 font-mono text-[11.5px]">
                      {post.likes}
                    </div>

                    {/* Date */}
                    <div className="text-center font-semibold text-slate-400 font-mono text-[11px]">
                      {post.date}
                    </div>

                    {/* Views */}
                    <div className="text-center font-bold text-slate-500 font-mono text-[11.5px]">
                      {post.views}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Pagination rows and Action submit buttons matching footer table layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            
            {/* Left/Middle: Pagination buttons */}
            <div className="flex items-center space-x-1.5" id="community-prev-next-links">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition-all"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-extrabold'
                        : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition-all"
              >
                ›
              </button>
            </div>

            {/* Right: Write action bottom button matching screenshot */}
            <button
              onClick={() => {
                setNewCategory('TOEFL');
                setWriteModalOpen(true);
              }}
              className="bg-[#1E293B] hover:bg-slate-800 text-white text-[11px] font-black uppercase px-6 py-2.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-3xs cursor-pointer select-none"
              id="write-table-bottom-btn"
            >
              <PenTool className="w-3.5 h-3.5 text-blue-400" />
              <span>Write</span>
            </button>
          </div>

        </div>

      </div>

      {/* ==================== CREATE POST OVERLAY FORM MODAL ==================== */}
      {writeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="forum-post-submission-overlay">
          <div className="bg-white rounded-[28px] w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PenTool className="w-4 h-4 text-blue-400" />
                <h3 className="text-base font-black tracking-tight font-sans">
                  Submit Academic Forum Query
                </h3>
              </div>
              <button
                onClick={() => setWriteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="p-6 space-y-4 text-left">
              
              {/* Category picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide">
                  Forum Classification Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['TOEFL', 'IELTS', 'PTE', 'Free Topic'] as any[]).map(cat => {
                    const isSelected = newCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewCategory(cat)}
                        className={`py-2 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-3xs font-extrabold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Writer Alias (Simulated masked) */}
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide block">
                  Author Pen-Name Alias
                </label>
                <input
                  type="text"
                  placeholder="e.g. ab (will be listed as ab******)"
                  value={newWriter}
                  maxLength={6}
                  onChange={(e) => setNewWriter(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-400"
                />
                <span className="text-[9.5px] text-slate-400 font-semibold leading-none">
                  For safety, your author alias will be automatically masked with asterisks.
                </span>
              </div>

              {/* Title Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide block">
                  Topic Title
                </label>
                <input
                  type="text"
                  placeholder="What is your query or study discovery?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-blue-400"
                  required
                />
              </div>

              {/* Content text */}
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide block">
                  Elaboration context
                </label>
                <textarea
                  placeholder="State your background, mock test scores, or study obstacles. Keep discussions civil and helpful."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full h-32 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-400 resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Actions footer button */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setWriteModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-[#475569] hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer transition-colors"
                >
                  Publish Topic
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================== ACTIVE DETAILED FORUM POST DIALOG READER ==================== */}
      {activePost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="forum-post-detail-reader">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header / Meta bar */}
            <div className="bg-slate-950 p-6 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-600 text-white font-black text-[9px] px-2.5 py-0.8 rounded uppercase tracking-wider block">
                  {activePost.category}
                </span>
                <span className="text-xs text-slate-400 font-bold font-mono">
                  Posted {activePost.date}
                </span>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Scrollable details panel */}
            <div className="p-6 overflow-y-auto flex-1 text-left space-y-6">
              
              {/* Title block */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {activePost.title}
                </h1>
                
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <div className="flex items-center space-x-1">
                    {activePost.isVerifiedWriter && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-current text-[#FFF]" />
                    )}
                    <span className={activePost.isVerifiedWriter ? 'text-blue-600 font-extrabold' : 'text-[#475569]'}>
                      By {activePost.writer}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] font-mono">
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{activePost.views}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{activePost.likes}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {activePost.content}
                </p>
              </div>

              {/* Like / Applaud buttons */}
              <div className="flex justify-start">
                <button
                  onClick={() => handleLikePost(activePost.id)}
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-3xs"
                >
                  <ThumbsUp className="w-4 h-4 text-blue-600 fill-current" />
                  <span>Applaud / Upvote ({activePost.likes})</span>
                </button>
              </div>

              {/* COMMENTS SECTION */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center space-x-1.5 font-sans">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>Comments ({activePost.comments.length})</span>
                </h3>

                {/* Comments List */}
                {activePost.comments.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl font-bold">
                    No comments submitted yet. Be the first to advise this student candidate!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activePost.comments.map(c => (
                      <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[11.5px] font-extrabold text-slate-800">
                            {c.writer}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold font-mono">
                            {c.date}
                          </span>
                        </div>
                        <p className="text-xs text-[#475569] font-medium leading-relaxed">
                          {c.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                    placeholder="Provide supportive feedback or answers to this candidate query..."
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-400 text-slate-800 placeholder-slate-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase px-4 py-2 cursor-pointer transition-colors"
                  >
                    Reply
                  </button>
                </form>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
