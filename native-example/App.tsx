import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
// AutoSkeleton will be imported from our package
import { AutoSkeleton } from 'auto-skeleton-react-and-native/native';

const { width } = Dimensions.get('window');

// ─── Demo Data ───────────────────────────────────────────────────────────────

const POSTS = [
    {
        id: 1,
        author: 'Alex Morgan',
        date: 'Apr 22, 2026',
        title: 'Building Accessible React Components from Scratch',
        desc: 'A deep dive into ARIA roles, keyboard navigation, and screen reader compatibility for modern React UIs.',
        tags: ['React', 'A11y', 'UX'],
    },
    {
        id: 2,
        author: 'Jordan Lee',
        date: 'Apr 20, 2026',
        title: 'State Management Patterns for Large-Scale Applications',
        desc: 'Comparing Redux Toolkit, Zustand, Jotai, and Recoil to help you pick the right tool for your team.',
        tags: ['State', 'Architecture', 'TypeScript'],
    },
];

const NOTIFICATIONS = [
    { id: 1, user: 'Sarah Jenks', action: 'liked your post', time: '2m ago', isUnread: true },
    { id: 2, user: 'Mike Ross', action: 'commented: "Great insights!"', time: '1h ago', isUnread: false },
];

const TRACK = {
    title: 'Midnight Coding Flow',
    artist: 'Lofi Girl',
    duration: '3:45',
    progress: '1:20'
};

// ─── Custom Components ───────────────────────────────────────────────────────

function BlogCard({ post }: { post: typeof POSTS[0] }) {
    return (
        <View style={styles.card}>
            {/* Header Image */}
            <View style={styles.cardImagePlaceholder} />
            
            <View style={styles.cardContent}>
                {/* Author row */}
                <View style={styles.authorRow}>
                    <View style={styles.avatar} />
                    <View style={styles.authorInfo}>
                        <Text style={styles.authorName}>{post.author}</Text>
                        <Text style={styles.authorDate}>{post.date}</Text>
                    </View>
                </View>

                {/* Title and Description */}
                <Text style={styles.cardTitle}>{post.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{post.desc}</Text>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                    {post.tags.map((tag) => (
                        <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer Action */}
                <View style={styles.cardFooter}>
                    <Text style={styles.readTime}>8 min read</Text>
                    <TouchableOpacity style={styles.readButton}>
                        <Text style={styles.readButtonText}>Read →</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function NotificationCard({ item }: { item: typeof NOTIFICATIONS[0] }) {
    return (
        <View style={styles.notificationCard}>
            <View style={styles.notificationAvatar} />
            <View style={styles.notificationBody}>
                <Text style={styles.notificationText}>
                    <Text style={{ fontWeight: 'bold', color: T.text }}>{item.user}</Text> {item.action}
                </Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
            {item.isUnread && <View style={styles.unreadDot} />}
        </View>
    );
}

function MusicPlayer() {
    return (
        <View style={styles.musicPlayer}>
            <View style={styles.albumArt} />
            <Text style={styles.trackTitle}>{TRACK.title}</Text>
            <Text style={styles.trackArtist}>{TRACK.artist}</Text>
            
            <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                    <View style={styles.progressBarFill} />
                </View>
                <View style={styles.progressTimes}>
                    <Text style={styles.progressTimeText}>{TRACK.progress}</Text>
                    <Text style={styles.progressTimeText}>{TRACK.duration}</Text>
                </View>
            </View>
            
            <View style={styles.musicControls}>
                <View style={styles.controlBtnSmall} />
                <View style={styles.controlBtnLarge} />
                <View style={styles.controlBtnSmall} />
            </View>
        </View>
    );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate network load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    const reload = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3500);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>⚡ AUTO Skeleton Native</Text>
                <TouchableOpacity onPress={reload} style={styles.reloadBtn}>
                    <Text style={styles.reloadBtnText}>Replay Demo</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Dynamic Blog Cards</Text>
                
                {POSTS.map((post) => (
                    <AutoSkeleton 
                        key={`post-${post.id}`} 
                        isLoading={isLoading} 
                        animation="wave" 
                        theme="dark"
                    >
                        <BlogCard post={post} />
                    </AutoSkeleton>
                ))}

                <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Notifications</Text>
                <View style={styles.notificationList}>
                    {NOTIFICATIONS.map((notif) => (
                        <AutoSkeleton key={`notif-${notif.id}`} isLoading={isLoading} theme="dark">
                            <NotificationCard item={notif} />
                        </AutoSkeleton>
                    ))}
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Now Playing</Text>
                <AutoSkeleton isLoading={isLoading} theme="dark" animation="pulse">
                    <MusicPlayer />
                </AutoSkeleton>
                
                <View style={{ height: 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const T = {
    bg: '#111116',
    surface: '#1a1a24',
    border: 'rgba(255,255,255,0.08)',
    text: '#ffffff',
    muted: '#9ca3af',
    accent: '#7c6bfa',
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: T.bg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: T.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: T.text,
    },
    reloadBtn: {
        backgroundColor: 'rgba(124,107,250,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    reloadBtnText: {
        color: T.accent,
        fontWeight: '600',
        fontSize: 12,
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: T.text,
        marginBottom: 16,
    },
    // Card Styles
    card: {
        backgroundColor: T.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: T.border,
        marginBottom: 24,
        overflow: 'hidden',
    },
    cardImagePlaceholder: {
        width: '100%',
        height: 180,
        backgroundColor: '#667eea',
    },
    cardContent: {
        padding: 20,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f093fb',
        marginRight: 12,
    },
    authorInfo: {
        flexDirection: 'column',
    },
    authorName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: T.text,
        marginBottom: 2,
    },
    authorDate: {
        fontSize: 12,
        color: T.muted,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: T.text,
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 14,
        color: T.muted,
        lineHeight: 20,
        marginBottom: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    tag: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: T.border,
    },
    tagText: {
        color: T.muted,
        fontSize: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: T.border,
        paddingTop: 16,
    },
    readTime: {
        fontSize: 12,
        color: T.muted,
    },
    readButton: {
        backgroundColor: T.accent,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    readButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    // Notification Styles
    notificationList: {
        backgroundColor: T.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: T.border,
        overflow: 'hidden',
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: T.border,
    },
    notificationAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#4ade80',
        marginRight: 16,
    },
    notificationBody: {
        flex: 1,
    },
    notificationText: {
        fontSize: 15,
        color: T.muted,
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 12,
        color: T.muted,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: T.accent,
        marginLeft: 12,
    },
    // Music Player Styles
    musicPlayer: {
        backgroundColor: T.surface,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: T.border,
        alignItems: 'center',
    },
    albumArt: {
        width: 200,
        height: 200,
        borderRadius: 16,
        backgroundColor: '#f87171',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    trackTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: T.text,
        marginBottom: 8,
    },
    trackArtist: {
        fontSize: 16,
        color: T.muted,
        marginBottom: 24,
    },
    progressContainer: {
        width: '100%',
        marginBottom: 24,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        width: '35%',
        backgroundColor: T.accent,
        borderRadius: 3,
    },
    progressTimes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressTimeText: {
        fontSize: 12,
        color: T.muted,
    },
    musicControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
    },
    controlBtnSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    controlBtnLarge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: T.accent,
    },
});
