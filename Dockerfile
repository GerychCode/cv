------
 > [stage-1 4/4] COPY --from=build /app/dist ./dist:
------
[+] up 0/1
 ⠙ Image cv-portfolio Building                                                                                                                         22.2s
Dockerfile:18

--------------------

  16 |     RUN npm install -g serve

  17 |

  18 | >>> COPY --from=build /app/dist ./dist

  19 |

  20 |     EXPOSE 1488

--------------------

failed to solve: failed to compute cache key: failed to calculate checksum of ref 6sd7c9n67hwdquciq98f2u0ma::ue9g8y1zbofwy77f6kjudsqsv: "/app/dist": not found
