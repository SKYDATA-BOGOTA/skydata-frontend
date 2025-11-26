# Encuesta de Satisfacción del Usuario (SUS - System Usability Scale)

**Base Normativa:**
- ISO/IEC 25022:2016 Sección 9.3 (Satisfaction)
- ISO/IEC 25010:2011 (Quality in Use model)

**Trazabilidad:**
- SwR-U01: Usabilidad y accesibilidad
- SwR-U02: Cumplimiento de estándares de accesibilidad

---

## Instrucciones para el Usuario

Por favor, califique cada afirmación según su experiencia usando el sistema SKYDATA. Use una escala del 1 al 5, donde:

- **1** = Totalmente en desacuerdo
- **2** = En desacuerdo
- **3** = Neutral
- **4** = De acuerdo
- **5** = Totalmente de acuerdo

---

## Preguntas SUS

1. Creo que me gustaría usar este sistema frecuentemente.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

2. Encontré el sistema innecesariamente complejo.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

3. Pensé que el sistema era fácil de usar.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

4. Creo que necesitaría el apoyo de una persona con conocimientos técnicos para poder usar este sistema.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

5. Encontré las diversas funciones de este sistema bien integradas.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

6. Pensé que había demasiada inconsistencia en este sistema.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

7. Me imagino que la mayoría de las personas aprenderían a usar este sistema muy rápidamente.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

8. Encontré el sistema muy incómodo de usar.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

9. Me sentí muy confiado usando el sistema.
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

10. Necesitaría aprender muchas cosas antes de poder empezar con este sistema.
    - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

---

## Cálculo del Puntaje SUS

### Pasos para calcular:

1. Para preguntas impares (1, 3, 5, 7, 9): Restar 1 a la puntuación
2. Para preguntas pares (2, 4, 6, 8, 10): Restar la puntuación de 5
3. Sumar todas las puntuaciones ajustadas
4. Multiplicar el total por 2.5

### Interpretación del Puntaje:

- **80-100**: Excelente (Sistema de clase mundial)
- **68-79**: Bueno (Sistema aceptable con mejoras menores)
- **51-67**: Aceptable (Sistema necesita mejoras significativas)
- **0-50**: Pobre (Sistema necesita rediseño)

---

## Métricas según ISO 25022:2016

**Sección 9.3 - Satisfaction Measures:**

- **QM_Satisfaction_SUS**: Puntaje SUS promedio de usuarios
- **QM_Satisfaction_Confidence**: Confianza del usuario (pregunta 9)
- **QM_Satisfaction_EaseOfUse**: Facilidad de uso percibida (pregunta 3)

**Umbrales según ISO 25022:2016:**
- Satisfacción aceptable: SUS ≥ 68
- Satisfacción excelente: SUS ≥ 80

---

## Proceso de Evaluación

1. **Preparación**: Asegurar que el sistema está funcionando correctamente
2. **Ejecución**: Usuarios completan tareas críticas (TASK-001 a TASK-003)
3. **Encuesta**: Usuarios completan esta encuesta SUS
4. **Análisis**: Calcular puntajes y comparar con umbrales ISO 25022:2016
5. **Documentación**: Registrar resultados en `5. PRUEBAS/14_Calidad_Uso_ISO_25022.tex`

---

**Nota**: Esta encuesta debe ser completada por usuarios reales después de usar el sistema. No puede automatizarse completamente, pero la estructura y el proceso están documentados según ISO 25022:2016.

