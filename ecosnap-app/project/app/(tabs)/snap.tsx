import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, RotateCcw, Zap, Image as ImageIcon, X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SnapActionScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const cameraRef = useRef<CameraView>(null);

  const ecoActions = [
    { id: 'recycle', title: 'Recycling', icon: '♻️', points: 15 },
    { id: 'transport', title: 'Public Transport', icon: '🚌', points: 10 },
    { id: 'energy', title: 'Energy Saving', icon: '💡', points: 12 },
    { id: 'water', title: 'Water Conservation', icon: '💧', points: 8 },
    { id: 'plant', title: 'Planting', icon: '🌱', points: 25 },
    { id: 'reuse', title: 'Reusing Items', icon: '🔄', points: 18 },
    { id: 'bike', title: 'Cycling/Walking', icon: '🚴', points: 20 },
    { id: 'compost', title: 'Composting', icon: '🍃', points: 22 },
  ];

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Camera size={64} color="#059669" />
        <Text style={styles.permissionTitle}>Camera Access Needed</Text>
        <Text style={styles.permissionText}>
          We need camera access to help you capture your eco-friendly actions
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo?.uri || null);
        setShowCamera(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const submitAction = () => {
    if (!selectedAction || !description.trim()) {
      Alert.alert('Missing Information', 'Please select an action type and add a description');
      return;
    }

    const action = ecoActions.find(a => a.id === selectedAction);
    Alert.alert(
      'Action Recorded! 🎉',
      `You've earned ${action?.points} points for ${action?.title}!`,
      [
        {
          text: 'Great!',
          onPress: () => {
            setCapturedPhoto(null);
            setSelectedAction('');
            setDescription('');
          }
        }
      ]
    );
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
                <RotateCcw size={24} color="#ffffff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <View style={styles.controlButton} />
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#059669', '#0891b2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Snap Action</Text>
        <Text style={styles.headerSubtitle}>Capture your eco-friendly moments</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Action Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What eco-action did you take?</Text>
          <View style={styles.actionsGrid}>
            {ecoActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.actionOption,
                  selectedAction === action.id && styles.actionOptionSelected
                ]}
                onPress={() => setSelectedAction(action.id)}
              >
                <Text style={styles.actionEmoji}>{action.icon}</Text>
                <Text style={[
                  styles.actionTitle,
                  selectedAction === action.id && styles.actionTitleSelected
                ]}>
                  {action.title}
                </Text>
                <Text style={[
                  styles.actionPoints,
                  selectedAction === action.id && styles.actionPointsSelected
                ]}>
                  +{action.points} pts
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add a photo</Text>
          {capturedPhoto ? (
            <View style={styles.photoPreview}>
              <Text style={styles.photoSuccessText}>📸 Photo captured!</Text>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setCapturedPhoto(null)}
              >
                <Text style={styles.retakeButtonText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setShowCamera(true)}
            >
              <Camera size={32} color="#059669" />
              <Text style={styles.cameraButtonText}>Take Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tell us more</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Describe your eco-friendly action..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedAction || !description.trim()) && styles.submitButtonDisabled
          ]}
          onPress={submitAction}
          disabled={!selectedAction || !description.trim()}
        >
          <Check size={20} color="#ffffff" />
          <Text style={styles.submitButtonText}>Record Action</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionOption: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionOptionSelected: {
    borderColor: '#059669',
    backgroundColor: '#059669' + '10',
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionTitleSelected: {
    color: '#059669',
  },
  actionPoints: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  actionPointsSelected: {
    color: '#059669',
  },
  cameraButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginTop: 8,
  },
  photoPreview: {
    backgroundColor: '#059669' + '10',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#059669',
  },
  photoSuccessText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 12,
  },
  retakeButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  retakeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#059669',
  },
});