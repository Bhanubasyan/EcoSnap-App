import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Star, Trophy, Target, Zap, Crown, Shield, Flame } from 'lucide-react-native';

export default function BadgesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Badges' },
    { id: 'earned', label: 'Earned' },
    { id: 'progress', label: 'In Progress' },
    { id: 'locked', label: 'Locked' },
  ];

  const earnedBadges = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first eco-action',
      icon: Star,
      color: '#059669',
      earned: true,
      earnedDate: '2 weeks ago',
      rarity: 'Common',
    },
    {
      id: 2,
      title: 'Recycling Hero',
      description: 'Recycle 10 items',
      icon: Award,
      color: '#0891b2',
      earned: true,
      earnedDate: '1 week ago',
      rarity: 'Common',
    },
    {
      id: 3,
      title: 'Green Streak',
      description: 'Complete actions for 7 consecutive days',
      icon: Flame,
      color: '#dc2626',
      earned: true,
      earnedDate: '3 days ago',
      rarity: 'Rare',
    },
    {
      id: 4,
      title: 'Eco Warrior',
      description: 'Complete 50 eco-actions',
      icon: Shield,
      color: '#7c3aed',
      earned: true,
      earnedDate: '2 days ago',
      rarity: 'Epic',
    },
  ];

  const progressBadges = [
    {
      id: 5,
      title: 'Century Club',
      description: 'Complete 100 eco-actions',
      icon: Trophy,
      color: '#f59e0b',
      earned: false,
      progress: 47,
      target: 100,
      rarity: 'Legendary',
    },
    {
      id: 6,
      title: 'Plant Parent',
      description: 'Plant 25 trees or plants',
      icon: Target,
      color: '#059669',
      earned: false,
      progress: 12,
      target: 25,
      rarity: 'Rare',
    },
    {
      id: 7,
      title: 'Energy Saver',
      description: 'Save 100kWh of energy',
      icon: Zap,
      color: '#eab308',
      earned: false,
      progress: 67,
      target: 100,
      rarity: 'Epic',
    },
  ];

  const lockedBadges = [
    {
      id: 8,
      title: 'Eco Legend',
      description: 'Complete 500 eco-actions',
      icon: Crown,
      color: '#8b5cf6',
      earned: false,
      locked: true,
      requirement: 'Unlock Century Club first',
      rarity: 'Mythic',
    },
    {
      id: 9,
      title: 'Community Leader',
      description: 'Inspire 50 people to join',
      icon: Award,
      color: '#f97316',
      earned: false,
      locked: true,
      requirement: 'Reach level 10 first',
      rarity: 'Legendary',
    },
  ];

  const allBadges = [...earnedBadges, ...progressBadges, ...lockedBadges];

  const getFilteredBadges = () => {
    switch (selectedCategory) {
      case 'earned':
        return earnedBadges;
      case 'progress':
        return progressBadges;
      case 'locked':
        return lockedBadges;
      default:
        return allBadges;
    }
  };

  const getRarityColor = (rarity: string) => {
    const colors: { [key: string]: string } = {
      Common: '#6b7280',
      Rare: '#0891b2',
      Epic: '#7c3aed',
      Legendary: '#f59e0b',
      Mythic: '#ec4899',
    };
    return colors[rarity] || '#6b7280';
  };

  const stats = [
    { label: 'Total Badges', value: '4', icon: Award },
    { label: 'Rare+', value: '3', icon: Star },
    { label: 'Completion', value: '67%', icon: Target },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#dc2626', '#7c3aed']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Badges</Text>
        <Text style={styles.headerSubtitle}>Your environmental achievements</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <stat.icon size={20} color="#059669" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.filterContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterButton,
                  selectedCategory === category.id && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === category.id && styles.filterButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Badges Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Badges' : 
             selectedCategory === 'earned' ? 'Earned Badges' :
             selectedCategory === 'progress' ? 'In Progress' : 'Locked Badges'}
          </Text>
          <View style={styles.badgesGrid}>
            {getFilteredBadges().map((badge) => (
              <View key={badge.id} style={[
                styles.badgeCard,
                !badge.earned && styles.badgeCardDisabled
              ]}>
                <View style={[
                  styles.badgeIconContainer,
                  { backgroundColor: badge.earned ? `${badge.color}15` : '#f3f4f615' }
                ]}>
                  <badge.icon 
                    size={32} 
                    color={badge.earned ? badge.color : '#9ca3af'} 
                  />
                </View>
                
                <View style={[
                  styles.rarityBadge,
                  { backgroundColor: getRarityColor(badge.rarity) + '15' }
                ]}>
                  <Text style={[
                    styles.rarityText,
                    { color: getRarityColor(badge.rarity) }
                  ]}>
                    {badge.rarity}
                  </Text>
                </View>

                <Text style={[
                  styles.badgeTitle,
                  !badge.earned && styles.badgeTitleDisabled
                ]}>
                  {badge.title}
                </Text>
                
                <Text style={[
                  styles.badgeDescription,
                  !badge.earned && styles.badgeDescriptionDisabled
                ]}>
                  {badge.description}
                </Text>

                {badge.earned && badge.earnedDate && (
                  <Text style={styles.earnedDate}>
                    Earned {badge.earnedDate}
                  </Text>
                )}

                {!badge.earned && 'progress' in badge && badge.progress !== undefined && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${(badge.progress / badge.target) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {badge.progress}/{badge.target}
                    </Text>
                  </View>
                )}

                {!badge.earned && 'locked' in badge && badge.locked && (
                  <View style={styles.lockedContainer}>
                    <Text style={styles.lockedText}>🔒 Locked</Text>
                    <Text style={styles.requirementText}>
                      {badge.requirement}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Achievement Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Achievement</Text>
          <View style={styles.showcaseCard}>
            <LinearGradient
              colors={['#7c3aed', '#dc2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.showcaseGradient}
            >
              <View style={styles.showcaseContent}>
                <View style={styles.showcaseIcon}>
                  <Shield size={40} color="#ffffff" />
                </View>
                <Text style={styles.showcaseTitle}>Eco Warrior</Text>
                <Text style={styles.showcaseDescription}>
                  You've completed 50 eco-actions and made a real difference!
                </Text>
                <View style={styles.showcaseRarity}>
                  <Text style={styles.showcaseRarityText}>EPIC ACHIEVEMENT</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Next Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Goals</Text>
          <View style={styles.goalsList}>
            <View style={styles.goalItem}>
              <View style={styles.goalIcon}>
                <Trophy size={20} color="#f59e0b" />
              </View>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>Century Club</Text>
                <Text style={styles.goalProgress}>47/100 actions completed</Text>
              </View>
              <Text style={styles.goalPercentage}>47%</Text>
            </View>
            
            <View style={styles.goalItem}>
              <View style={styles.goalIcon}>
                <Target size={20} color="#059669" />
              </View>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>Plant Parent</Text>
                <Text style={styles.goalProgress}>12/25 plants grown</Text>
              </View>
              <Text style={styles.goalPercentage}>48%</Text>
            </View>
          </View>
        </View>
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
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    marginHorizontal: -8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
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
    backgroundColor: '#059669' + '15',
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#059669',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeCardDisabled: {
    opacity: 0.6,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeTitleDisabled: {
    color: '#9ca3af',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  badgeDescriptionDisabled: {
    color: '#d1d5db',
  },
  earnedDate: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '600',
  },
  lockedContainer: {
    alignItems: 'center',
  },
  lockedText: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: '600',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 9,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 12,
  },
  showcaseCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  showcaseGradient: {
    padding: 24,
  },
  showcaseContent: {
    alignItems: 'center',
  },
  showcaseIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  showcaseTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  showcaseDescription: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  showcaseRarity: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  showcaseRarityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  goalsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  goalProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  goalPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
});