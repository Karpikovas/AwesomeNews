<?php

namespace App\Repository;

use App\Entity\NewsWorld;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NewsWorld|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewsWorld|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewsWorld[]    findAll()
 * @method NewsWorld[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsWorldRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NewsWorld::class);
    }

    // /**
    //  * @return NewsWorld[] Returns an array of NewsWorld objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NewsWorld
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
