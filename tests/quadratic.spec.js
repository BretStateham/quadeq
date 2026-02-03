// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Quadratic Equation Visualizer', () => {
  
  test('page loads without console errors', async ({ page }) => {
    const consoleErrors = [];
    const consoleWarnings = [];
    const consoleLogs = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      } else {
        consoleLogs.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForTimeout(3000); // Wait for all scripts to load
    
    console.log('=== Console Logs ===');
    consoleLogs.forEach(log => console.log('LOG:', log));
    
    console.log('=== Console Warnings ===');
    consoleWarnings.forEach(warn => console.log('WARN:', warn));
    
    console.log('=== Console Errors ===');
    consoleErrors.forEach(err => console.log('ERROR:', err));
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'tests/screenshots/page-load.png', fullPage: true });
    
    // Check for critical errors
    const criticalErrors = consoleErrors.filter(e => 
      !e.includes('favicon') && !e.includes('404')
    );
    
    if (criticalErrors.length > 0) {
      console.log('Critical errors found:', criticalErrors);
    }
  });

  test('Desmos API is loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    const desmosLoaded = await page.evaluate(() => {
      return typeof window.Desmos !== 'undefined';
    });
    
    console.log('Desmos loaded:', desmosLoaded);
    expect(desmosLoaded).toBe(true);
  });

  test('Alpine.js initializes correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    const alpineData = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      if (mainEl && mainEl._x_dataStack) {
        const data = mainEl._x_dataStack[0];
        return {
          a: data.a,
          b: data.b,
          c: data.c,
          hasCalculator: data.calculator !== null
        };
      }
      return null;
    });
    
    console.log('Alpine data:', alpineData);
    expect(alpineData).not.toBeNull();
    expect(alpineData.a).toBe(1);
    expect(alpineData.b).toBe(0);
    expect(alpineData.c).toBe(0);
  });

  test('Desmos calculator initializes', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Check if calculator container has content
    const calculatorState = await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      const mainEl = document.querySelector('main');
      
      return {
        containerExists: calcEl !== null,
        containerHeight: calcEl?.offsetHeight || 0,
        containerWidth: calcEl?.offsetWidth || 0,
        hasCanvas: calcEl?.querySelector('canvas') !== null,
        innerHTML: calcEl?.innerHTML?.substring(0, 500) || 'empty',
        calculatorInstance: mainEl?._x_dataStack?.[0]?.calculator !== null
      };
    });
    
    console.log('Calculator state:', JSON.stringify(calculatorState, null, 2));
    
    await page.screenshot({ path: 'tests/screenshots/calculator.png' });
    
    expect(calculatorState.containerExists).toBe(true);
    expect(calculatorState.containerHeight).toBeGreaterThan(0);
  });

  test('debug Desmos expressions', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Try to get Desmos state
    const desmosState = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      
      if (!appData || !appData.calculator) {
        return { error: 'No calculator instance' };
      }
      
      try {
        // Get all expressions from Desmos
        const state = appData.calculator.getState();
        return {
          expressionCount: state.expressions?.list?.length || 0,
          expressions: state.expressions?.list?.map(e => ({
            id: e.id,
            latex: e.latex,
            color: e.color
          })) || []
        };
      } catch (e) {
        return { error: e.message };
      }
    });
    
    console.log('Desmos state:', JSON.stringify(desmosState, null, 2));
  });

  test('test equation building', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Test the buildEquationLatex function directly
    const testResults = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      
      if (!appData) return { error: 'No app data' };
      
      // Test with different coefficient values
      const originalA = appData.a;
      const originalB = appData.b;
      const originalC = appData.c;
      
      const tests = [];
      
      // Test 1: Default values (1, 0, 0)
      appData.a = 1; appData.b = 0; appData.c = 0;
      tests.push({ 
        input: 'a=1, b=0, c=0', 
        latex: appData.buildEquationLatex ? appData.buildEquationLatex() : 'no method'
      });
      
      // Test 2: Positive values
      appData.a = 2; appData.b = 3; appData.c = 4;
      tests.push({ 
        input: 'a=2, b=3, c=4', 
        latex: appData.buildEquationLatex ? appData.buildEquationLatex() : 'no method'
      });
      
      // Test 3: Negative b and c
      appData.a = 3; appData.b = -4; appData.c = 4;
      tests.push({ 
        input: 'a=3, b=-4, c=4', 
        latex: appData.buildEquationLatex ? appData.buildEquationLatex() : 'no method'
      });
      
      // Restore original values
      appData.a = originalA;
      appData.b = originalB;
      appData.c = originalC;
      
      return tests;
    });
    
    console.log('Equation building tests:', JSON.stringify(testResults, null, 2));
  });

  test('sliders update values', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Get initial values
    const initial = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      return { a: appData?.a, b: appData?.b, c: appData?.c };
    });
    console.log('Initial values:', initial);
    
    // Change slider a
    await page.fill('#coef-a', '3');
    await page.waitForTimeout(500);
    
    const afterA = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      return { a: appData?.a, b: appData?.b, c: appData?.c };
    });
    console.log('After changing a:', afterA);
    
    await page.screenshot({ path: 'tests/screenshots/after-slider.png' });
  });

  test('graph renders with visible parabola', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(4000);
    
    // Take a screenshot of just the graph area
    const calculator = page.locator('#calculator');
    await calculator.screenshot({ path: 'tests/screenshots/graph-only.png' });
    
    // Check viewport bounds
    const graphInfo = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      
      if (!appData || !appData.calculator) {
        return { error: 'No calculator' };
      }
      
      const bounds = appData.calculator.graphpaperBounds;
      const state = appData.calculator.getState();
      
      return {
        bounds: bounds,
        graphSettings: state.graph,
        expressions: state.expressions?.list?.map(e => ({ id: e.id, latex: e.latex })),
        calculatedViewport: appData.calculateViewport ? appData.calculateViewport() : 'no method'
      };
    });
    
    console.log('Graph info:', JSON.stringify(graphInfo, null, 2));
    
    // Check if there's a canvas with actual content
    const canvasInfo = await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      const canvases = calcEl?.querySelectorAll('canvas');
      
      if (!canvases || canvases.length === 0) {
        return { error: 'No canvas elements found' };
      }
      
      return {
        canvasCount: canvases.length,
        canvasSizes: Array.from(canvases).map(c => ({
          width: c.width,
          height: c.height,
          style: c.style.cssText
        }))
      };
    });
    
    console.log('Canvas info:', JSON.stringify(canvasInfo, null, 2));
  });

  test('test with user coefficients a=3 b=-4 c=4', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Use slider interaction instead of direct property setting
    // This mimics actual user behavior
    const sliderA = page.locator('#coef-a');
    const sliderB = page.locator('#coef-b');
    const sliderC = page.locator('#coef-c');
    
    // Set a=3 (range is -5 to 5, step 0.1)
    await sliderA.fill('3');
    await page.waitForTimeout(500);
    
    // Set b=-4 (range is -10 to 10, step 0.1)
    await sliderB.fill('-4');
    await page.waitForTimeout(500);
    
    // Set c=4 (range is -10 to 10, step 0.1)
    await sliderC.fill('4');
    await page.waitForTimeout(1000);
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/user-coefficients.png', fullPage: true });
    
    // Take graph-only screenshot
    const calculator = page.locator('#calculator');
    await calculator.screenshot({ path: 'tests/screenshots/user-graph.png' });
    
    // Check the state
    const graphInfo = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      
      if (!appData || !appData.calculator) {
        return { error: 'No calculator' };
      }
      
      const state = appData.calculator.getState();
      const bounds = appData.calculator.graphpaperBounds;
      
      // Check canvas content
      const calcEl = document.getElementById('calculator');
      const canvas = calcEl?.querySelector('canvas');
      let canvasData = null;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, 10, 10);
          // Check if any non-white pixels exist
          let hasColor = false;
          for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i] !== 255 || imageData.data[i+1] !== 255 || imageData.data[i+2] !== 255) {
              hasColor = true;
              break;
            }
          }
          canvasData = { width: canvas.width, height: canvas.height, hasColor };
        }
      }
      
      return {
        coefficients: { a: appData.a, b: appData.b, c: appData.c },
        builtLatex: appData.buildEquationLatex ? appData.buildEquationLatex() : 'no method',
        expressions: state.expressions?.list?.map(e => ({ id: e.id, latex: e.latex })),
        bounds: bounds?.mathCoordinates,
        discriminant: appData.discriminant,
        vertex: { x: appData.vertexX, y: appData.vertexY },
        xIntercepts: appData.xIntercepts,
        canvasData
      };
    });
    
    console.log('User coefficients test:', JSON.stringify(graphInfo, null, 2));
    
    // Verify coefficients were actually set
    expect(graphInfo.coefficients.a).toBe(3);
    expect(graphInfo.coefficients.b).toBe(-4);
    expect(graphInfo.coefficients.c).toBe(4);
  });

  test('minimal desmos test', async ({ page }) => {
    await page.goto('/test-desmos.html');
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/minimal-desmos.png', fullPage: true });
    
    // Get status
    const status = await page.locator('#status').textContent();
    console.log('Minimal Desmos status:', status);
    
    // Check canvas
    const canvasInfo = await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      const canvases = calcEl?.querySelectorAll('canvas');
      return {
        canvasCount: canvases?.length || 0,
        innerHTML: calcEl?.innerHTML?.substring(0, 300)
      };
    });
    console.log('Canvas info:', JSON.stringify(canvasInfo, null, 2));
  });

  test('check expression errors in Desmos', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Screenshot at initial load
    await page.screenshot({ path: 'tests/screenshots/debug-1-initial.png', fullPage: true });
    
    const result = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      
      if (!appData || !appData.calculator) {
        return { error: 'No calculator' };
      }
      
      const calc = appData.calculator;
      const state = calc.getState();
      
      // Get expression analysis
      const expressionAnalysis = state.expressions?.list?.map(e => {
        // Try to get the model for this expression
        return {
          id: e.id,
          latex: e.latex,
          color: e.color,
          type: e.type,
          hidden: e.hidden,
          errorHidden: e.errorHidden
        };
      });
      
      return {
        expressions: expressionAnalysis,
        graphSettings: state.graph
      };
    });
    
    console.log('Expression analysis:', JSON.stringify(result, null, 2));
    
    // Now try re-setting the expression directly and compare
    await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      const calc = appData.calculator;
      
      // Clear all expressions first
      const state = calc.getState();
      state.expressions.list.forEach(e => {
        calc.removeExpression({ id: e.id });
      });
      
      // Add just a simple parabola
      calc.setExpression({
        id: 'test-parabola',
        latex: 'y = x^2',
        color: '#ff0000'
      });
    });
    
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/screenshots/debug-2-simple-parabola.png', fullPage: true });
    
    const afterSimple = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      return appData.calculator.getState().expressions.list.map(e => ({ id: e.id, latex: e.latex }));
    });
    
    console.log('After simple parabola:', JSON.stringify(afterSimple, null, 2));
  });

  test('isolated desmos test - no Alpine', async ({ page }) => {
    await page.goto('/test-isolated.html');
    await page.waitForTimeout(3000);
    
    // Screenshot
    await page.screenshot({ path: 'tests/screenshots/isolated-test.png', fullPage: true });
    
    // Get log output
    const logOutput = await page.locator('#output').textContent();
    console.log('Isolated test log:', logOutput);
    
    // Check canvas for actual drawn pixels (not just grid)
    const pixelCheck = await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      const canvas = calcEl?.querySelector('canvas');
      
      if (!canvas) return { error: 'No canvas' };
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return { error: 'No context' };
      
      // Sample pixels along where parabola should be
      // For y = x^2 + 2x + 3, at x=0, y=3
      // At x=-1, y=2 (vertex)
      // Let's check if there are non-grid-color pixels
      
      // Get full image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Count unique colors
      const colors = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        const key = `${r},${g},${b}`;
        colors.set(key, (colors.get(key) || 0) + 1);
      }
      
      // Check for blue parabola color (#2d70b3 = 45, 112, 179)
      const hasBlue = Array.from(colors.keys()).some(k => {
        const [r, g, b] = k.split(',').map(Number);
        return b > 150 && g > 80 && g < 130 && r < 80;
      });
      
      return {
        canvasSize: { width: canvas.width, height: canvas.height },
        uniqueColorCount: colors.size,
        hasBlueish: hasBlue,
        topColors: Array.from(colors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10)
      };
    });
    
    console.log('Pixel check:', JSON.stringify(pixelCheck, null, 2));
  });

  test('main app pixel check', async ({ page }) => {
    // Capture browser console logs
    const browserLogs = [];
    page.on('console', msg => browserLogs.push(msg.text()));
    page.on('pageerror', err => browserLogs.push('PAGE ERROR: ' + err.message));
    
    await page.goto('/');
    await page.waitForTimeout(5000); // Wait longer for initialization
    
    console.log('Browser console logs:', JSON.stringify(browserLogs, null, 2));
    
    // Screenshot first
    await page.screenshot({ path: 'test-results/main-app-debug.png', fullPage: true });
    
    // First, let's check the exact state of the calculator
    const initialState = await page.evaluate(() => {
      const mainEl = document.querySelector('main');
      const appData = mainEl?._x_dataStack?.[0];
      
      if (!appData) return { error: 'No Alpine data' };
      if (!appData.calculator) return { error: 'No calculator instance' };
      
      const calc = appData.calculator;
      const state = calc.getState();
      
      return {
        hasCalculator: true,
        expressionCount: state.expressions?.list?.length,
        expressions: state.expressions?.list?.map(e => ({ id: e.id, latex: e.latex, color: e.color })),
        graph: state.graph
      };
    });
    
    console.log('Initial calculator state:', JSON.stringify(initialState, null, 2));
    
    // Check canvas for actual drawn pixels
    const pixelCheck = await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      const canvases = calcEl?.querySelectorAll('canvas');
      
      if (!canvases || canvases.length === 0) return { error: 'No canvas elements' };
      
      // Try all canvases
      const results = [];
      canvases.forEach((canvas, idx) => {
        try {
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            results.push({ canvas: idx, error: 'No 2d context' });
            return;
          }
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Count unique colors
          const colors = new Map();
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i+1], b = data[i+2];
            const key = `${r},${g},${b}`;
            colors.set(key, (colors.get(key) || 0) + 1);
          }
          
          const hasBlue = Array.from(colors.keys()).some(k => {
            const [r, g, b] = k.split(',').map(Number);
            return b > 150 && g > 80 && g < 130 && r < 80;
          });
          
          results.push({
            canvas: idx,
            size: { width: canvas.width, height: canvas.height },
            uniqueColors: colors.size,
            hasBlue: hasBlue,
            topColors: Array.from(colors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)
          });
        } catch (e) {
          results.push({ canvas: idx, error: e.message });
        }
      });
      
      return { canvasCount: canvases.length, results };
    });
    
    console.log('All canvas pixel check:', JSON.stringify(pixelCheck, null, 2));
    
    // Now bypass Alpine completely and use the calculator directly
    console.log('Bypassing Alpine, drawing directly...');
    
    await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      
      // Create a completely new calculator instance
      const newCalc = Desmos.GraphingCalculator(calcEl, {
        expressions: false,
        settingsMenu: false
      });
      
      newCalc.setMathBounds({ left: -10, right: 10, bottom: -10, top: 10 });
      newCalc.setExpression({ id: 'test', latex: 'y = x^2', color: '#ff0000' });
      
      window.__testCalc = newCalc;
    });
    
    await page.waitForTimeout(2000);
    
    // Check again
    const afterNewCalc = await page.evaluate(() => {
      const calcEl = document.getElementById('calculator');
      const canvases = calcEl?.querySelectorAll('canvas');
      
      if (!canvases || canvases.length === 0) return { error: 'No canvas' };
      
      const canvas = canvases[canvases.length - 1]; // Get last canvas (newest)
      try {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Look for red pixels
        let redCount = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 200 && data[i+1] < 100 && data[i+2] < 100) redCount++;
        }
        
        return { canvasCount: canvases.length, redPixels: redCount };
      } catch (e) {
        return { error: e.message };
      }
    });
    
    console.log('After new calculator:', JSON.stringify(afterNewCalc, null, 2));
    
    await page.screenshot({ path: 'tests/screenshots/main-app-debug.png', fullPage: true });
  });
});
