import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'; // Added Linking
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, ChartBar as BarChart3, Map, Award, Leaf, Users, Target, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const quickActions = [
    {
      title: 'Snap Action',
      subtitle: 'Capture eco-friendly moments',
      icon: Camera,
      color: '#059669',
      route: 'snap',
    },
    {
      title: 'View Logs',
      subtitle: 'Track your progress',
      icon: BarChart3,
      color: '#0891b2',
      route: 'logs',
    },
    {
      title: 'Community Map',
      subtitle: 'See local impact',
      icon: Map,
      color: '#7c3aed',
      route: 'map',
    },
    {
      title: 'Badges',
      subtitle: 'Your achievements',
      icon: Award,
      color: '#dc2626',
      route: 'badges',
    },
  ];

  const stats = [
    { label: 'Actions Taken', value: '47', icon: Target, color: '#059669' },
    { label: 'CO₂ Saved', value: '12.3kg', icon: Leaf, color: '#0891b2' },
    { label: 'Community', value: '1.2k', icon: Users, color: '#7c3aed' },
    { label: 'Streak', value: '7 days', icon: TrendingUp, color: '#dc2626' },
  ];

  // Function to handle opening the Bolt.new link
  const handleBoltLinkPress = () => {
    Linking.openURL('https://bolt.new').catch(err => console.error('Failed to open URL', err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#059669', '#0891b2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>EcoSnap</Text>
            <Text style={styles.emoji}>🌱</Text>
          </View>
          <Text style={styles.subtitle}>Track, Act, Impact</Text>
          <Text style={styles.welcomeText}>
            Every small action creates ripples of positive change
          </Text>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
              <stat.icon size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(`/(tabs)/${action.route}`)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: `${action.color}15` }]}>
                <action.icon size={28} color={action.color} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Challenge</Text>
        <View style={styles.challengeCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.challengeImage}
          />
          <View style={styles.challengeContent}>
            <Text style={styles.challengeTitle}>Use Reusable Bags</Text>
            <Text style={styles.challengeDescription}>
              Skip plastic bags during your next shopping trip and snap a photo to earn points!
            </Text>
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Accept Challenge</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {[
            { action: 'Recycled plastic bottles', time: '2 hours ago', points: '+15' },
            { action: 'Used public transport', time: '1 day ago', points: '+10' },
            { action: 'Planted herbs', time: '2 days ago', points: '+25' },
          ].map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Leaf size={16} color="#059669" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Text style={styles.activityPoints}>{activity.points}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* "Built with Bolt.new" Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Built with{' '}
          <Text style={styles.boltLink} onPress={handleBoltLinkPress}>
            Bolt.new
          </Text>
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginRight: 8,
  },
  emoji: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -20,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  challengeImage: {
    width: '100%',
    height: 160,
  },
  challengeContent: {
    padding: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  challengeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  activityList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669' + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  // New styles for the footer text
  footerContainer: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 20, // Add some space from the bottom of the screen
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  boltLink: {
    color: '#059669', // A green color that matches your app's theme
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});