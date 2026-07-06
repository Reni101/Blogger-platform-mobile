import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1c1f2e',
  },
  caption: {
    fontSize: 13,
    color: '#7c8090',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: '#e2e6ef',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textGroup: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1f2e',
  },
  rowTitleDanger: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cb3a31',
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#7c8090',
  },
  separator: {
    height: 1,
    backgroundColor: '#eef1f7',
    marginLeft: 16,
  },
});
