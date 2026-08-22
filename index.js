const links = document.querySelectorAll('.link-tile');
const status = document.querySelector('.window-status');

links.forEach((link) => {
  link.addEventListener('pointerdown', () => {
    link.classList.add('is-opening');
  });

  link.addEventListener('pointerup', () => {
    window.setTimeout(() => link.classList.remove('is-opening'), 180);
  });

  link.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      link.classList.add('is-opening');
      window.setTimeout(() => link.classList.remove('is-opening'), 180);
    }
  });
});

window.setInterval(() => {
  if (!status) return;
  status.textContent = status.textContent === '[ ONLINE ]' ? '[ READY ]' : '[ ONLINE ]';
}, 2400);

const canvas = document.getElementById('liquid-canvas');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useFallback = () => {
  document.documentElement.classList.add('liquid-fallback');
};

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl, vertexSource, fragmentSource) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const startLiquid = () => {
  if (!canvas || prefersReducedMotion) {
    useFallback();
    return;
  }

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    powerPreference: 'low-power',
  });

  if (!gl) {
    useFallback();
    return;
  }

  const vertexSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 pointer;
    uniform vec2 velocity;

    float hash(vec2 value) {
      return fract(sin(dot(value, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 value) {
      vec2 cell = floor(value);
      vec2 local = fract(value);
      local = local * local * (3.0 - 2.0 * local);
      return mix(
        mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x),
        mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), local.x),
        local.y
      );
    }

    float fbm(vec2 value) {
      float result = 0.0;
      float amplitude = 0.5;
      for (int index = 0; index < 4; index++) {
        result += amplitude * noise(value);
        value = value * 2.0 + vec2(17.3, 9.2);
        amplitude *= 0.5;
      }
      return result;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
      vec2 point = (uv - 0.5) * aspect;
      vec2 cursor = (pointer - 0.5) * aspect;
      float motion = time * 0.12;
      float distanceToCursor = length(point - cursor);

      vec2 flow = point;
      flow += 0.16 * vec2(sin(point.y * 4.0 + motion), cos(point.x * 3.2 - motion));
      flow += velocity * vec2(0.28, -0.18);
      flow += normalize(point - cursor + vec2(0.0001)) * sin(distanceToCursor * 22.0 - time * 2.4) * 0.012 * exp(-distanceToCursor * 2.6);

      float firstLayer = fbm(flow * 1.55 + vec2(motion * 0.35, -motion * 0.22));
      float secondLayer = fbm(flow * 2.7 - vec2(motion * 0.16, motion * 0.1));
      vec3 deep = vec3(0.12, 0.012, 0.06);
      vec3 maroon = vec3(0.36, 0.025, 0.14);
      vec3 berry = vec3(0.72, 0.075, 0.28);
      vec3 pink = vec3(1.0, 0.30, 0.52);
      vec3 color = mix(deep, maroon, smoothstep(0.2, 0.65, firstLayer));
      color = mix(color, berry, smoothstep(0.48, 0.86, secondLayer));
      color += pink * smoothstep(0.68, 1.0, firstLayer) * 0.16;
      color += vec3(0.75, 0.18, 0.32) * exp(-distanceToCursor * 3.3) * 0.18;

      float vignette = 1.0 - smoothstep(0.28, 0.78, length((uv - 0.5) * vec2(1.05, 1.2)));
      color *= mix(0.76, 1.0, vignette);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const program = createProgram(gl, vertexSource, fragmentSource);
  if (!program) {
    useFallback();
    return;
  }

  const buffer = gl.createBuffer();
  const positionLocation = gl.getAttribLocation(program, 'position');
  const resolutionLocation = gl.getUniformLocation(program, 'resolution');
  const timeLocation = gl.getUniformLocation(program, 'time');
  const pointerLocation = gl.getUniformLocation(program, 'pointer');
  const velocityLocation = gl.getUniformLocation(program, 'velocity');

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1,
  ]), gl.STATIC_DRAW);
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const targetPointer = { x: 0.5, y: 0.5 };
  const pointer = { x: 0.5, y: 0.5 };
  const targetVelocity = { x: 0, y: 0 };
  const velocity = { x: 0, y: 0 };
  let lastPointer = { x: 0.5, y: 0.5 };
  let startTime = performance.now();

  const updatePointer = (event) => {
    const nextX = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
    const nextY = Math.min(1, Math.max(0, 1 - event.clientY / window.innerHeight));
    targetPointer.x = nextX;
    targetPointer.y = nextY;
    targetVelocity.x = Math.min(1, Math.max(-1, (nextX - lastPointer.x) * 7.0));
    targetVelocity.y = Math.min(1, Math.max(-1, (nextY - lastPointer.y) * 7.0));
    lastPointer = { x: nextX, y: nextY };
  };

  const resize = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(window.innerWidth * pixelRatio);
    canvas.height = Math.floor(window.innerHeight * pixelRatio);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const render = (now) => {
    pointer.x += (targetPointer.x - pointer.x) * 0.08;
    pointer.y += (targetPointer.y - pointer.y) * 0.08;
    velocity.x += (targetVelocity.x - velocity.x) * 0.16;
    velocity.y += (targetVelocity.y - velocity.y) * 0.16;
    targetVelocity.x *= 0.93;
    targetVelocity.y *= 0.93;

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, (now - startTime) / 1000);
    gl.uniform2f(pointerLocation, pointer.x, pointer.y);
    gl.uniform2f(velocityLocation, velocity.x, velocity.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    window.requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', updatePointer, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    useFallback();
  });
  resize();
  window.requestAnimationFrame(render);
};

startLiquid();
