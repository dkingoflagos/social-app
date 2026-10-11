import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme/colors';
import { stories, posts, trendingTopics } from './src/data/mockData';
import { PostCard } from './src/components/PostCard';

const tabs = ['Home', 'Explore', 'Create', 'Chat', 'Profile'];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [email, setEmail] = useState('hello@socialapp.dev');
  const [password, setPassword] = useState('••••••••');

  const activeContent = useMemo(() => {
    if (activeTab === 'Home') {
      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Text style={styles.brand}>SocialApp</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyRow}>
            {stories.map((story) => (
              <View key={story.id} style={styles.storyItem}>
                <View style={styles.storyAvatarWrap}>
                  <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                </View>
                <Text style={styles.storyName}>{story.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.trendingCard}>
            <Text style={styles.sectionTitle}>Trending</Text>
            <View style={styles.tagRow}>
              {trendingTopics.map((topic) => (
                <TouchableOpacity key={topic} style={styles.tagChip}>
                  <Text style={styles.tagText}>#{topic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ScrollView>
      );
    }

    if (activeTab === 'Explore') {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Explore</Text>
          <Text style={styles.emptyText}>Discover creators, communities and trends in your city.</Text>
        </View>
      );
    }

    if (activeTab === 'Create') {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Create</Text>
          <Text style={styles.emptyText}>Share your next post, story or livestream.</Text>
        </View>
      );
    }

    if (activeTab === 'Chat') {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Messages</Text>
          <Text style={styles.emptyText}>Your conversations with friends and communities will appear here.</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' }}
          style={styles.profileImage}
        />
        <Text style={styles.emptyTitle}>Aisha Rivers</Text>
        <Text style={styles.emptyText}>@aisharivers • Product designer • Based in Lagos</Text>
      </View>
    );
  }, [activeTab]);

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loginScreen}>
          <View style={styles.logoWrap}>
            <View style={styles.logoBadge}>
              <Ionicons name="people" size={28} color={colors.white} />
            </View>
            <Text style={styles.logoText}>SocialApp</Text>
          </View>

          <Text style={styles.loginTitle}>Welcome back</Text>
          <Text style={styles.loginSubtitle}>Connect with your community and share your stories.</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.muted}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => setIsLoggedIn(true)}>
            <Text style={styles.primaryButtonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.secondaryLink}>Create account</Text>
          </TouchableOpacity>

          <Text style={styles.footText}>Continue with</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>Google</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>Apple</Text></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.appShell}>
        {activeContent}

        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            const iconName =
              tab === 'Home' ? 'home' :
              tab === 'Explore' ? 'compass' :
              tab === 'Create' ? 'add-circle' :
              tab === 'Chat' ? 'chatbubble' :
              'person';

            return (
              <TouchableOpacity
                key={tab}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab)}
              >
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isActive ? colors.primary : colors.muted}
                />
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loginScreen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  loginTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 28,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: colors.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#161D2F',
    borderColor: '#24314F',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 14,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryLink: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 22,
  },
  footText: {
    textAlign: 'center',
    color: colors.muted,
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#101827',
    borderWidth: 1,
    borderColor: '#1E2A3D',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  socialText: {
    color: colors.text,
    fontWeight: '600',
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 12,
  },
  brand: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#171F30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 10,
  },
  storyRow: {
    marginBottom: 8,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyAvatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    backgroundColor: colors.primary,
    marginBottom: 8,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  storyName: {
    color: colors.text,
    fontSize: 12,
  },
  trendingCard: {
    backgroundColor: '#101827',
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#18253D',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: colors.text,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E2A3D',
    paddingVertical: 10,
    paddingBottom: 18,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  tabText: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
