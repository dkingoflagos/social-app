import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userMeta}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.userHandle}>@{post.user.handle} • {post.time}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.muted} />
      </View>

      <Text style={styles.postText}>{post.text}</Text>

      {post.image ? (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      ) : null}

      <View style={styles.actionRow}>
        <View style={styles.actionItem}>
          <Ionicons name="heart-outline" size={18} color={colors.muted} />
          <Text style={styles.actionText}>{post.likes}</Text>
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="chatbubble-outline" size={18} color={colors.muted} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="repeat-outline" size={18} color={colors.muted} />
          <Text style={styles.actionText}>{post.shares}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E2A3D',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  userMeta: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  userHandle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  postText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    marginBottom: 12,
  },
  postImage: {
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: colors.muted,
    fontSize: 13,
  },
});
