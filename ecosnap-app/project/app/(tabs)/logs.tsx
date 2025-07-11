import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartBar as BarChart3, Calendar, TrendingUp, Award, Leaf, Target, Filter } from 'lucide-react-native';

export default function LogsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  const categories = [
    { id: 'all', label: 'All Actions', color: '#059669' },
    { id: 'recycle', label: 'Recycling', color: '#0891b2' },
    { id: 'transport', label: 'Transport', color: '#7c3aed' },
    { id: 'energy', label: 'Energy', color: '#dc2626' },
  ];

  const weeklyData = [
    { day: 'Mon', actions: 3, points: 45 },
    { day: 'Tue', actions: 5, points: 75 },
    { day: 'Wed', actions: 2, points: 30 },
    { day: 'Thu', actions: 7, points: 105 },
    { day: 'Fri', actions: 4, points: 60 },
    { day: 'Sat', actions: 6, points: 90 },
    { day: 'Sun', actions: 8, points: 120 },
  ];

  const recentActions = [
    {
      id: 1,
      type: 'Recycling',
      description: 'Recycled 5 plastic bottles',
      points: 15,
      time: '2 hours ago',
      icon: '♻️',
      color: '#0891b2',
    },
    {
      id: 2,
      type: 'Public Transport',
      description: 'Took bus instead of car',
      points: 10,
      time: '5 hours ago',
      icon: '🚌',
      color: '#7c3aed',
    },
    {
      id: 3,
      type: 'Energy Saving',
      description: 'Used LED bulbs',
      points: 12,
      time: '1 day ago',
      icon: '💡',
      color: '#dc2626',
    },
    {
      id: 4,
      type: 'Planting',
      description: 'Planted herbs in garden',
      points: 25,
      time: '2 days ago',
      icon: '🌱',
      color: '#059669',
    },
    {
      id: 5,
      type: 'Water Conservation',
      description: 'Fixed leaky faucet',
      points: 8,
      time: '3 days ago',
      icon: '💧',
      color: '#0891b2',
    },
  ];

  const maxPoints = Math.max(...weeklyData.map(d => d.points));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#0891b2', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Activity Logs</Text>
        <Text style={styles.headerSubtitle}>Track your environmental impact</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Target size={24} color="#059669" />
            </View>
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Total Actions</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={24} color="#0891b2" />
            </View>
            <Text style={styles.statValue}>525</Text>
            <Text style={styles.statLabel}>Points Earned</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Leaf size={24} color="#7c3aed" />
            </View>
            <Text style={styles.statValue}>12.3kg</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>
        </View>

        {/* Period Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Period</Text>
          <View style={styles.filterContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.filterButton,
                  selectedPeriod === period.id && styles.filterButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedPeriod === period.id && styles.filterButtonTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {weeklyData.map((data, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        { height: (data.points / maxPoints) * 100 }
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{data.day}</Text>
                  <Text style={styles.barValue}>{data.points}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#059669' }]} />
                <Text style={styles.legendText}>Points Earned</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && { backgroundColor: category.color + '15', borderColor: category.color }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && { color: category.color }
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Recent Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Actions</Text>
          <View style={styles.actionsList}>
            {recentActions.map((action) => (
              <View key={action.id} style={styles.actionItem}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionType}>{action.type}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                  <Text style={styles.actionTime}>{action.time}</Text>
                </View>
                <View style={styles.actionPoints}>
                  <Text style={styles.actionPointsText}>+{action.points}</Text>
                  <Text style={styles.actionPointsLabel}>pts</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Award size={20} color="#dc2626" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Eco Warrior</Text>
                <Text style={styles.achievementDescription}>Completed 50 eco-actions</Text>
              </View>
              <Text style={styles.achievementDate}>2 days ago</Text>
            </View>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Award size={20} color="#7c3aed" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Green Streak</Text>
                <Text style={styles.achievementDescription}>7 days of consistent actions</Text>
              </View>
              <Text style={styles.achievementDate}>1 week ago</Text>
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
    padding: 20,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#059669',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    backgroundColor: '#059669',
    borderRadius: 4,
    minHeight: 4,
    width: 20,
  },
  barLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '600',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingRight: 24,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  actionsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionEmoji: {
    fontSize: 20,
  },
  actionContent: {
    flex: 1,
  },
  actionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  actionTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actionPoints: {
    alignItems: 'center',
  },
  actionPointsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  actionPointsLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  achievementsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  achievementDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
});