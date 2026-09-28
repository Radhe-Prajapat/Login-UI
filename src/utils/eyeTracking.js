/**
 * Utility functions for 3D Eye Mouse Tracking
 * Calculates pupil displacement (dx, dy) relative to eye center
 * with max radius constraint and smooth linear interpolation (lerp).
 */

export const calculatePupilPosition = (mouseX, mouseY, eyeElement, maxDistance = 14) => {
  if (!eyeElement) return { x: 0, y: 0 };

  const rect = eyeElement.getBoundingClientRect();
  const eyeCenterX = rect.left + rect.width / 2;
  const eyeCenterY = rect.top + rect.height / 2;

  const deltaX = mouseX - eyeCenterX;
  const deltaY = mouseY - eyeCenterY;

  const distance = Math.hypot(deltaX, deltaY);
  const angle = Math.atan2(deltaY, deltaX);

  // Clamp distance to maxDistance radius
  const clampedDistance = Math.min(distance * 0.08, maxDistance);

  const x = Math.cos(angle) * clampedDistance;
  const y = Math.sin(angle) * clampedDistance;

  return { x, y };
};

/**
 * Calculates 3D Card Tilt angles based on mouse position relative to card center.
 */
export const calculateCardTilt = (mouseX, mouseY, cardElement, maxTiltDeg = 6) => {
  if (!cardElement) return { tiltX: 0, tiltY: 0 };

  const rect = cardElement.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const cardCenterY = rect.top + rect.height / 2;

  const relativeX = (mouseX - cardCenterX) / (rect.width / 2);
  const relativeY = (mouseY - cardCenterY) / (rect.height / 2);

  // Clamp between -1 and 1
  const clampedX = Math.max(-1, Math.min(1, relativeX));
  const clampedY = Math.max(-1, Math.min(1, relativeY));

  // tiltX is rotated around X-axis (depends on relativeY)
  const tiltX = -clampedY * maxTiltDeg;
  // tiltY is rotated around Y-axis (depends on relativeX)
  const tiltY = clampedX * maxTiltDeg;

  return { tiltX, tiltY };
};
