import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Users, Leaf, TrendingUp, Filter, Search } from 'lucide-react-native';

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Actions', color: '#059669' },
    { id: 'recycle', label: 'Recycling', color: '#0891b2' },
    { id: 'transport', label: 'Transport', color: '#7c3aed' },
    { id: 'energy', label: 'Energy', color: '#dc2626' },
    { id: 'plant', label: 'Planting', color: '#059669' },
  ];

  const communityStats = [
    { label: 'Active Users', value: '1,247', icon: Users, color: '#059669' },
    { label: 'Actions Today', value: '89', icon: TrendingUp, color: '#0891b2' },
    { label: 'CO₂ Saved', value: '156kg', icon: Leaf, color: '#7c3aed' },
  ];

  const nearbyActions = [
    {
      id: 1,
      user: 'Sarah M.',
      action: 'Planted 5 trees in Central Park',
      location: '0.2 miles away',
      time: '2 hours ago',
      points: 25,
      type: 'plant',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 2,
      user: 'Mike R.',
      action: 'Organized community recycling drive',
      location: '0.5 miles away',
      time: '4 hours ago',
      points: 50,
      type: 'recycle',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 3,
      user: 'Emma L.',
      action: 'Switched to solar panels',
      location: '0.8 miles away',
      time: '1 day ago',
      points: 100,
      type: 'energy',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 4,
      user: 'David K.',
      action: 'Bike commute for a week',
      location: '1.2 miles away',
      time: '2 days ago',
      points: 35,
      type: 'transport',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  const hotspots = [
    {
      id: 1,
      name: 'Green Valley Community Center',
      actions: 47,
      distance: '0.3 miles',
      type: 'Community Hub',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Riverside Park',
      actions: 32,
      distance: '0.7 miles',
      type: 'Nature Spot',
      image: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Downtown Recycling Center',
      actions: 28,
      distance: '1.1 miles',
      type: 'Recycling Hub',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const getActionIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      plant: '🌱',
      recycle: '♻️',
      energy: '💡',
      transport: '🚴',
      water: '💧',
    };
    return icons[type] || '🌍';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#7c3aed', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Community Map</Text>
        <Text style={styles.headerSubtitle}>Discover local environmental impact</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Community Stats */}
        <View style={styles.statsContainer}>
          {communityStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Map Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Area</Text>
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay}>
              <View style={styles.mapPin}>
                <MapPin size={20} color="#ffffff" />
              </View>
              <Text style={styles.mapText}>Your Location</Text>
              <Text style={styles.mapSubtext}>47 eco-actions nearby</Text>
            </View>
          </View>
        </View>

        {/* Action Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.id && { backgroundColor: filter.color + '15', borderColor: filter.color }
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter.id && { color: filter.color }
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Eco Hotspots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eco Hotspots</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.hotspotsContainer}>
              {hotspots.map((hotspot) => (
                <TouchableOpacity key={hotspot.id} style={styles.hotspotCard}>
                  <Image source={{ uri: hotspot.image }} style={styles.hotspotImage} />
                  <View style={styles.hotspotContent}>
                    <Text style={styles.hotspotName}>{hotspot.name}</Text>
                    <Text style={styles.hotspotType}>{hotspot.type}</Text>
                    <View style={styles.hotspotStats}>
                      <Text style={styles.hotspotActions}>{hotspot.actions} actions</Text>
                      <Text style={styles.hotspotDistance}>{hotspot.distance}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Nearby Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Actions</Text>
          <View style={styles.actionsList}>
            {nearbyActions.map((action) => (
              <View key={action.id} style={styles.actionItem}>
                <Image source={{ uri: action.avatar }} style={styles.userAvatar} />
                <View style={styles.actionContent}>
                  <View style={styles.actionHeader}>
                    <Text style={styles.userName}>{action.user}</Text>
                    <Text style={styles.actionTime}>{action.time}</Text>
                  </View>
                  <Text style={styles.actionDescription}>{action.action}</Text>
                  <View style={styles.actionFooter}>
                    <View style={styles.actionLocation}>
                      <MapPin size={12} color="#6b7280" />
                      <Text style={styles.locationText}>{action.location}</Text>
                    </View>
                    <View style={styles.actionPoints}>
                      <Text style={styles.actionIcon}>{getActionIcon(action.type)}</Text>
                      <Text style={styles.pointsText}>+{action.points} pts</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Community Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Challenges</Text>
          <View style={styles.challengesList}>
            <View style={styles.challengeItem}>
              <View style={styles.challengeIcon}>
                <Text style={styles.challengeEmoji}>🌳</Text>
              </View>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeTitle}>Plant 100 Trees</Text>
                <Text style={styles.challengeDescription}>Community goal: 73/100 trees planted</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '73%' }]} />
                </View>
              </View>
            </View>
            
            <View style={styles.challengeItem}>
              <View style={styles.challengeIcon}>
                <Text style={styles.challengeEmoji}>♻️</Text>
              </View>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeTitle}>Recycle 500kg</Text>
                <Text style={styles.challengeDescription}>Community goal: 342/500kg recycled</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '68%' }]} />
                </View>
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
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
  mapContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 150, 105, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingRight: 24,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  hotspotsContainer: {
    flexDirection: 'row',
    paddingRight: 24,
  },
  hotspotCard: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hotspotImage: {
    width: '100%',
    height: 120,
  },
  hotspotContent: {
    padding: 16,
  },
  hotspotName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  hotspotType: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  hotspotStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hotspotActions: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  hotspotDistance: {
    fontSize: 12,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  actionTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  actionPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  challengesList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  challengeItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  challengeEmoji: {
    fontSize: 20,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
});