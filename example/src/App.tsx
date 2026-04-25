import React, { useState, useEffect } from 'react';
import { AutoSkeleton } from 'auto-skeleton-react-and-native';

// ─── Demo Data ───────────────────────────────────────────────────────────────

const POSTS = [
    {
        id: 1,
        author: 'Alex Morgan',
        date: 'Apr 22, 2026',
        title: 'Building Accessible React Components from Scratch',
        desc: 'A deep dive into ARIA roles, keyboard navigation, and screen reader compatibility for modern React UIs.',
        tags: ['React', 'A11y', 'UX'],
        views: '12.4k',
        readTime: '8 min read',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        avatarGradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    },
    {
        id: 2,
        author: 'Jordan Lee',
        date: 'Apr 20, 2026',
        title: 'State Management Patterns for Large-Scale Applications',
        desc: 'Comparing Redux Toolkit, Zustand, Jotai, and Recoil to help you pick the right tool for your team.',
        tags: ['State', 'Architecture', 'TypeScript'],
        views: '9.1k',
        readTime: '11 min read',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        avatarGradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    },
    {
        id: 3,
        author: 'Priya Sharma',
        date: 'Apr 18, 2026',
        title: 'The 2026 Guide to Performance Optimization in React',
        desc: 'Lazy loading, code splitting, memoization, and profiling — everything you need to ship blazing fast apps.',
        tags: ['Performance', 'React', 'Webpack'],
        views: '18.7k',
        readTime: '14 min read',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        avatarGradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    },
];

// ─── Design tokens (match CSS vars) ─────────────────────────────────────────

const T = {
    surface: '#1a1a24',
    surface2: '#22222f',
    border: 'rgba(255,255,255,0.08)',
    accent: '#7c6bfa',
    accent2: '#fa6b9a',
    muted: '#9090a8',
    text: '#f0f0f5',
    radius: 16,
    radiusSm: 10,
};

// ─── Blog Card ───────────────────────────────────────────────────────────────

interface Post {
    id: number;
    author: string;
    date: string;
    title: string;
    desc: string;
    tags: string[];
    views: string;
    readTime: string;
    gradient: string;
    avatarGradient: string;
}

function BlogCard({ post }: { post: Post }) {
    return (
        <div
            className="card fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                overflow: 'hidden',
            }}
        >
            {/* Cover image */}
            <div
                style={{
                    width: '100%',
                    height: 200,
                    background: post.gradient,
                    flexShrink: 0,
                }}
            />

            {/* Body */}
            <div
                style={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    flex: 1,
                }}
            >
                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            background: post.avatarGradient,
                            flexShrink: 0,
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{post.author}</div>
                        <div style={{ fontSize: 13, color: T.muted }}>{post.date}</div>
                    </div>
                </div>

                {/* Title */}
                <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>
                    {post.title}
                </div>

                {/* Description */}
                <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>
                    {post.desc}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {post.tags.map((t) => (
                        <span
                            key={t}
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                padding: '4px 10px',
                                borderRadius: 20,
                                background: 'rgba(124,107,250,0.12)',
                                color: T.accent,
                                border: '1px solid rgba(124,107,250,0.2)',
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 12,
                        borderTop: `1px solid ${T.border}`,
                        marginTop: 4,
                    }}
                >
                    <span style={{ fontSize: 13, color: T.muted }}>
                        👁 {post.views} · ⏱ {post.readTime}
                    </span>
                    <button
                        style={{
                            background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            padding: '8px 18px',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            width: 90,
                            height: 36,
                        }}
                    >
                        Read →
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Profile Card ────────────────────────────────────────────────────────────

function ProfileCard() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                padding: 32,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    flexShrink: 0,
                }}
            />
            <div style={{ fontWeight: 700, fontSize: 20 }}>Sarah Williams</div>
            <div style={{ fontSize: 14, color: T.muted, maxWidth: 260, lineHeight: 1.5 }}>
                Senior Frontend Engineer · Building open source tools that make devs happy 🚀
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 32 }}>
                {[
                    { num: '847', label: 'Posts' },
                    { num: '12.6k', label: 'Followers' },
                    { num: '341', label: 'Following' },
                ].map(({ num, label }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <span style={{ fontWeight: 700, fontSize: 22 }}>{num}</span>
                        <span style={{ fontSize: 12, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            <button
                style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: T.radiusSm,
                    background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
                    color: 'white',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    height: 46,
                }}
            >
                Follow
            </button>
        </div>
    );
}

// ─── Chat Card ───────────────────────────────────────────────────────────────

function ChatCard() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 20px',
                    borderBottom: `1px solid ${T.border}`,
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                        flexShrink: 0,
                    }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontWeight: 600 }}>David Chen</div>
                    <div style={{ fontSize: 13, color: '#4ade80' }}>● Online</div>
                </div>
            </div>

            {/* Messages */}
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                    { text: "Hey! How's the AutoSkeleton package coming along?", out: false },
                    { text: 'Almost done! Zero config, works perfectly 🎉', out: true },
                    { text: "That's amazing! Can't wait to try it out.", out: false },
                ].map((msg, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: msg.out ? 'row-reverse' : 'row' }}>
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: T.surface2,
                                flexShrink: 0,
                            }}
                        />
                        <div
                            style={{
                                maxWidth: '65%',
                                padding: '10px 14px',
                                borderRadius: 14,
                                fontSize: 14,
                                lineHeight: 1.5,
                                background: msg.out ? `linear-gradient(135deg, ${T.accent}, ${T.accent2})` : T.surface2,
                                color: msg.out ? 'white' : T.text,
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 16px',
                    borderTop: `1px solid ${T.border}`,
                }}
            >
                <input
                    type="text"
                    placeholder="Type a message…"
                    style={{
                        flex: 1,
                        background: T.surface2,
                        border: `1px solid ${T.border}`,
                        borderRadius: T.radiusSm,
                        padding: '10px 14px',
                        color: T.text,
                        fontFamily: 'inherit',
                        fontSize: 14,
                        outline: 'none',
                        height: 40,
                    }}
                />
                <button
                    style={{
                        padding: '10px 16px',
                        background: T.accent,
                        color: 'white',
                        border: 'none',
                        borderRadius: T.radiusSm,
                        fontFamily: 'inherit',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: 14,
                        height: 40,
                        width: 70,
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

// ─── Stats Card ──────────────────────────────────────────────────────────────

function StatsCard() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                padding: 24,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
            }}
        >
            <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Monthly Revenue
            </div>
            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.04em' }}>
                $84,291
            </div>

            {/* Progress bar */}
            <div style={{ height: 8, background: T.surface2, borderRadius: 4, overflow: 'hidden' }}>
                <div
                    style={{
                        height: '100%',
                        width: '72%',
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})`,
                    }}
                />
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { label: 'Subscriptions', value: '$61,200', color: T.text },
                    { label: 'One-time purchases', value: '$18,491', color: T.text },
                    { label: 'Refunds', value: '−$2,400', color: '#f38ba8' },
                ].map(({ label, value, color }) => (
                    <div
                        key={label}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 0',
                            borderBottom: `1px solid ${T.border}`,
                        }}
                    >
                        <span style={{ fontSize: 14, color: T.muted }}>{label}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color }}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface Product {
    name: string;
    brand: string;
    price: string;
    originalPrice: string;
    rating: number;
    reviews: number;
    badge: string;
    imgGradient: string;
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            {/* Badge */}
            <div
                style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: T.accent2,
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 20,
                    zIndex: 1,
                }}
            >
                {product.badge}
            </div>

            {/* Product image */}
            <div
                style={{
                    width: '100%',
                    height: 220,
                    background: product.imgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ fontSize: 64 }}>👟</div>
            </div>

            {/* Info */}
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 12, color: T.accent, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                    {product.brand}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{product.name}</div>

                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} style={{ color: i < product.rating ? '#fbbf24' : T.border, fontSize: 14 }}>★</span>
                        ))}
                    </div>
                    <span style={{ fontSize: 13, color: T.muted }}>({product.reviews})</span>
                </div>

                {/* Pricing */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 800, fontSize: 22 }}>{product.price}</span>
                    <span style={{ fontSize: 14, color: T.muted, textDecoration: 'line-through' }}>{product.originalPrice}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button
                        style={{
                            flex: 1,
                            height: 42,
                            background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
                            color: 'white',
                            border: 'none',
                            borderRadius: 10,
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: 'pointer',
                        }}
                    >
                        Add to Cart
                    </button>
                    <button
                        style={{
                            width: 42,
                            height: 42,
                            background: T.surface2,
                            color: T.text,
                            border: `1px solid ${T.border}`,
                            borderRadius: 10,
                            fontSize: 18,
                            cursor: 'pointer',
                        }}
                    >
                        ♡
                    </button>
                </div>
            </div>
        </div>
    );
}

const PRODUCTS: Product[] = [
    { name: 'AirMax Pro 2026', brand: 'Nike', price: '$189', originalPrice: '$249', rating: 4, reviews: 1284, badge: '24% OFF', imgGradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
    { name: 'UltraBoost X Carbon', brand: 'Adidas', price: '$215', originalPrice: '$270', rating: 5, reviews: 876, badge: 'BESTSELLER', imgGradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
    { name: 'CloudRunner Elite', brand: 'On Running', price: '$159', originalPrice: '$199', rating: 4, reviews: 432, badge: 'NEW', imgGradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
];

// ─── Notification Feed ────────────────────────────────────────────────────────
interface Notification {
    id: number;
    avatar: string;
    avatarGradient: string;
    name: string;
    action: string;
    target: string;
    time: string;
    unread: boolean;
    icon: string;
}

const NOTIFICATIONS: Notification[] = [
    { id: 1, avatar: 'JD', avatarGradient: 'linear-gradient(135deg,#667eea,#764ba2)', name: 'James Doe', action: 'commented on your post', target: 'Building with AutoSkeleton', time: '2m ago', unread: true, icon: '💬' },
    { id: 2, avatar: 'SE', avatarGradient: 'linear-gradient(135deg,#43e97b,#38f9d7)', name: 'Sara Evans', action: 'liked your project', target: 'react-scroll-magic', time: '15m ago', unread: true, icon: '❤️' },
    { id: 3, avatar: 'MK', avatarGradient: 'linear-gradient(135deg,#fa709a,#fee140)', name: 'Mia Kim', action: 'started following you', target: '', time: '1h ago', unread: false, icon: '👤' },
    { id: 4, avatar: 'TP', avatarGradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', name: 'Tom Park', action: 'merged your pull request', target: '#142 Fix skeleton depth', time: '3h ago', unread: false, icon: '✅' },
];

function NotificationFeed() {
    return (
        <div
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: `1px solid ${T.border}`,
                }}
            >
                <div style={{ fontWeight: 700, fontSize: 16 }}>Notifications</div>
                <div
                    style={{
                        background: T.accent,
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 700,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    2
                </div>
            </div>

            {/* List */}
            {NOTIFICATIONS.map((n) => (
                <div
                    key={n.id}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        padding: '14px 20px',
                        borderBottom: `1px solid ${T.border}`,
                        background: n.unread ? 'rgba(124,107,250,0.04)' : 'transparent',
                    }}
                >
                    {/* Avatar */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: n.avatarGradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: 13,
                                color: 'white',
                            }}
                        >
                            {n.avatar}
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: T.surface,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 10,
                            }}
                        >
                            {n.icon}
                        </div>
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                            <span style={{ fontWeight: 600 }}>{n.name}</span>{' '}
                            <span style={{ color: T.muted }}>{n.action}</span>{' '}
                            {n.target && <span style={{ color: T.accent }}>{n.target}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{n.time}</div>
                    </div>

                    {/* Unread dot */}
                    {n.unread && (
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: T.accent,
                                flexShrink: 0,
                                marginTop: 6,
                            }}
                        />
                    )}
                </div>
            ))}

            {/* Footer */}
            <div style={{ padding: '12px 20px', textAlign: 'center' as const }}>
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: T.accent,
                        fontFamily: 'inherit',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    View all notifications →
                </button>
            </div>
        </div>
    );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
interface Job {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    skills: string[];
    logo: string;
    logoGradient: string;
    posted: string;
}

const JOBS: Job[] = [
    {
        title: 'Senior React Engineer',
        company: 'Vercel',
        location: 'Remote · USA',
        salary: '$160k – $210k',
        type: 'Full-time',
        skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
        logo: 'V',
        logoGradient: 'linear-gradient(135deg,#000,#333)',
        posted: 'Posted 2 days ago',
    },
    {
        title: 'React Native Lead',
        company: 'Shopify',
        location: 'Toronto · Hybrid',
        salary: '$140k – $185k',
        type: 'Full-time',
        skills: ['React Native', 'Swift', 'Kotlin', 'Redux'],
        logo: 'S',
        logoGradient: 'linear-gradient(135deg,#96bf48,#5e8e3e)',
        posted: 'Posted 5 days ago',
    },
    {
        title: 'Frontend Architect',
        company: 'Stripe',
        location: 'San Francisco · Onsite',
        salary: '$180k – $240k',
        type: 'Full-time',
        skills: ['React', 'Performance', 'WebGL', 'Design Systems'],
        logo: 'S',
        logoGradient: 'linear-gradient(135deg,#635bff,#4b45c6)',
        posted: 'Posted 1 week ago',
    },
];

function JobCard({ job }: { job: Job }) {
    return (
        <div
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                transition: 'all 0.2s',
            }}
        >
            {/* Top row: logo + company + badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: job.logoGradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: 22,
                            color: 'white',
                            flexShrink: 0,
                        }}
                    >
                        {job.logo}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{job.title}</div>
                        <div style={{ fontSize: 14, color: T.muted }}>{job.company}</div>
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '4px 12px',
                        borderRadius: 20,
                        background: 'rgba(124,107,250,0.12)',
                        color: T.accent,
                        border: `1px solid rgba(124,107,250,0.2)`,
                        whiteSpace: 'nowrap' as const,
                    }}
                >
                    {job.type}
                </div>
            </div>

            {/* Location + salary */}
            <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 13, color: T.muted }}>📍 {job.location}</div>
                <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 600 }}>💰 {job.salary}</div>
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                {job.skills.map((s) => (
                    <span
                        key={s}
                        style={{
                            fontSize: 12,
                            padding: '3px 10px',
                            borderRadius: 6,
                            background: T.surface2,
                            color: T.muted,
                            border: `1px solid ${T.border}`,
                            fontWeight: 500,
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 12, color: T.muted }}>{job.posted}</span>
                <button
                    style={{
                        height: 36,
                        padding: '0 18px',
                        background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        width: 100,
                    }}
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}

// ─── Music Player ─────────────────────────────────────────────────────────────
function MusicPlayer() {
    return (
        <div
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.radius,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
            }}
        >
            {/* Album art + info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                    }}
                >
                    🎵
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Midnight Coding</div>
                    <div style={{ fontSize: 14, color: T.muted }}>Lo-Fi Beats · Chill Vibes</div>
                    <div style={{ fontSize: 12, color: T.accent }}>Now Playing</div>
                </div>
                <button
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'transparent',
                        border: `1px solid ${T.border}`,
                        color: T.text,
                        fontSize: 16,
                        cursor: 'pointer',
                    }}
                >
                    ♡
                </button>
            </div>

            {/* Progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ height: 4, background: T.surface2, borderRadius: 2, overflow: 'hidden' }}>
                    <div
                        style={{
                            width: '38%',
                            height: '100%',
                            background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})`,
                            borderRadius: 2,
                        }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: T.muted }}>1:23</span>
                    <span style={{ fontSize: 12, color: T.muted }}>3:45</span>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                {['⏮', '⏪', '⏸', '⏩', '⏭'].map((icon, i) => (
                    <button
                        key={i}
                        style={{
                            width: i === 2 ? 52 : 36,
                            height: i === 2 ? 52 : 36,
                            borderRadius: '50%',
                            background: i === 2 ? `linear-gradient(135deg, ${T.accent}, ${T.accent2})` : 'transparent',
                            border: i === 2 ? 'none' : `1px solid ${T.border}`,
                            color: i === 2 ? 'white' : T.text,
                            fontSize: i === 2 ? 20 : 16,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </button>
                ))}
            </div>

            {/* Queue */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>
                    Up Next
                </div>
                {[
                    { title: 'Deep Focus Flow', artist: 'Ambient Dreams' },
                    { title: 'Rain & Code', artist: 'Nature Sounds' },
                ].map(({ title, artist }) => (
                    <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: T.surface2, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                            <div style={{ fontSize: 12, color: T.muted }}>{artist}</div>
                        </div>
                        <div style={{ fontSize: 12, color: T.muted }}>3:18</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── App ─────────────────────────────────────────────────────────────────────

type AnimationType = 'wave' | 'pulse' | 'none';
type ThemeType = 'dark' | 'light';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [animation, setAnimation] = useState<AnimationType>('wave');
    const [theme, setTheme] = useState<ThemeType>('dark');

    const reload = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2800);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Header */}
            <header className="header">
                <div className="header-logo">
                    <span className="logo-badge">⚡ AUTO</span>
                    <span>Skeleton</span>
                </div>
                <div className="header-badge">v1.0.0 · npm</div>
            </header>

            {/* Hero */}
            <section className="hero">
                <div className="hero-tag">🪄 Zero Configuration</div>
                <h1>
                    Automatic Skeleton Loading<br />
                    for <span>React &amp; React Native</span>
                </h1>
                <p className="hero-desc">
                    Wrap any component. AutoSkeleton analyses your layout and renders
                    pixel-perfect shimmer placeholders — no code changes needed.
                </p>
            </section>

            {/* Controls */}
            <div className="controls">
                <span className={`status-pill ${isLoading ? 'loading' : 'ready'}`}>
                    <span className="pulse-dot" />
                    {isLoading ? 'Skeleton active' : 'Content loaded'}
                </span>

                <button className="btn btn-primary" onClick={reload} id="reload-btn">
                    ↺ Replay Demo
                </button>

                <select
                    className="select-control"
                    value={animation}
                    onChange={(e) => setAnimation(e.target.value as AnimationType)}
                    id="animation-select"
                >
                    <option value="wave">Wave animation</option>
                    <option value="pulse">Pulse animation</option>
                    <option value="none">No animation</option>
                </select>

                <select
                    className="select-control"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as ThemeType)}
                    id="theme-select"
                >
                    <option value="dark">Dark theme</option>
                    <option value="light">Light theme</option>
                </select>
            </div>

            {/* Blog Cards Demo */}
            <section className="demo-section">
                <h2 className="demo-section-title">Blog Cards</h2>
                <div className="demo-grid">
                    {POSTS.map((post) => (
                        <AutoSkeleton
                            key={post.id}
                            isLoading={isLoading}
                            animation={animation}
                            theme={theme}
                            borderRadius={10}
                            speed={1.6}
                        >
                            <BlogCard post={post} />
                        </AutoSkeleton>
                    ))}
                </div>
            </section>

            {/* Mixed Components Demo */}
            <section className="demo-section">
                <h2 className="demo-section-title">Mixed Components</h2>
                <div className="demo-grid">
                    <AutoSkeleton isLoading={isLoading} animation={animation} theme={theme}>
                        <ProfileCard />
                    </AutoSkeleton>

                    <AutoSkeleton isLoading={isLoading} animation={animation} theme={theme}>
                        <ChatCard />
                    </AutoSkeleton>

                    <AutoSkeleton isLoading={isLoading} animation={animation} theme={theme}>
                        <StatsCard />
                    </AutoSkeleton>
                </div>
            </section>

            {/* ── NEW: Brand-new components — auto-detected by AutoSkeleton ── */}
            <section className="demo-section">
                <h2 className="demo-section-title">
                    🆕 Dynamic Detection — New Components Auto-Skeletonised
                </h2>

                {/* Product cards — e-commerce */}
                <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: 14 }}>
                    🛍️ <strong style={{ color: 'var(--text)' }}>Product Cards</strong> — image, badge, stars, price, cart/wishlist buttons
                </p>
                <div className="demo-grid" style={{ marginBottom: 40 }}>
                    {PRODUCTS.map((p) => (
                        <AutoSkeleton
                            key={p.name}
                            isLoading={isLoading}
                            animation={animation}
                            theme={theme}
                            borderRadius={10}
                        >
                            <ProductCard product={p} />
                        </AutoSkeleton>
                    ))}
                </div>

                {/* Job cards + Notification feed + Music player */}
                <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: 14 }}>
                    💼 <strong style={{ color: 'var(--text)' }}>Job Cards</strong> &nbsp;·&nbsp;
                    🔔 <strong style={{ color: 'var(--text)' }}>Notification Feed</strong> &nbsp;·&nbsp;
                    🎵 <strong style={{ color: 'var(--text)' }}>Music Player</strong>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
                    {/* Job cards */}
                    {JOBS.map((job) => (
                        <AutoSkeleton
                            key={job.title}
                            isLoading={isLoading}
                            animation={animation}
                            theme={theme}
                            borderRadius={8}
                        >
                            <JobCard job={job} />
                        </AutoSkeleton>
                    ))}

                    {/* Notification Feed */}
                    <AutoSkeleton isLoading={isLoading} animation={animation} theme={theme}>
                        <NotificationFeed />
                    </AutoSkeleton>

                    {/* Music Player */}
                    <AutoSkeleton isLoading={isLoading} animation={animation} theme={theme}>
                        <MusicPlayer />
                    </AutoSkeleton>
                </div>
            </section>

            {/* Code Example */}
            <section className="code-section">
                <h2 className="demo-section-title">Usage</h2>
                <div className="code-block">
                    <div className="code-header">
                        <div className="code-dots">
                            <div className="code-dot" style={{ background: '#ff5f57' }} />
                            <div className="code-dot" style={{ background: '#febc2e' }} />
                            <div className="code-dot" style={{ background: '#28c840' }} />
                        </div>
                        <span className="code-lang">TSX</span>
                    </div>
                    <div className="code-content">
                        <span className="c-cm">{'// 1. Install'}</span>{'\n'}
                        {'npm install auto-skeleton-react-and-native\n\n'}
                        <span className="c-cm">{'// 2. React (Web) usage'}</span>{'\n'}
                        <span className="c-kw">import</span>{' { '}
                        <span className="c-fn">AutoSkeleton</span>
                        {' } '}<span className="c-kw">from</span>{' '}
                        <span className="c-str">'auto-skeleton-react-and-native'</span>{'\n\n'}
                        <span className="c-tag">{'<AutoSkeleton'}</span>
                        {'\n  '}
                        <span className="c-att">isLoading</span>
                        {'={'}
                        <span className="c-val">isLoading</span>
                        {'}'}{'\n  '}
                        <span className="c-att">animation</span>
                        {'='}
                        <span className="c-str">"wave"</span>
                        {'\n  '}
                        <span className="c-att">theme</span>
                        {'='}
                        <span className="c-str">"dark"</span>
                        {'\n  '}
                        <span className="c-att">borderRadius</span>
                        {'={'}
                        <span className="c-val">10</span>
                        {'}'}{'\n'}
                        <span className="c-tag">{'>'}</span>
                        {'\n  '}
                        <span className="c-tag">{'<YourComponent'}</span>
                        {' '}
                        <span className="c-att">{'/>'}</span>
                        {'\n'}
                        <span className="c-tag">{'</AutoSkeleton>'}</span>
                        {'\n\n'}
                        <span className="c-cm">{'// 3. React Native usage'}</span>{'\n'}
                        <span className="c-kw">import</span>{' { '}
                        <span className="c-fn">AutoSkeleton</span>
                        {' } '}<span className="c-kw">from</span>{' '}
                        <span className="c-str">'auto-skeleton-react-and-native/native'</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>MIT License · Made with ♥ by the AutoSkeleton team</p>
                <p style={{ marginTop: '8px', opacity: 0.6 }}>
                    npm install auto-skeleton-react-and-native · github.com/auto-skeleton-react-and-native/auto-skeleton-react-and-native
                </p>
            </footer>
        </>
    );
}
